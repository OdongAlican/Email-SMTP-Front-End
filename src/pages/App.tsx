import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { generatePDF } from "../utils/pdf";
import { sendEmailService } from "../utils/api";
import { IDeposit, ILoanDisbursement, RowData } from "../utils/interface";
import BasicTabs, { CustomTabPanel } from "../components/TabsComponent";
import { formatAsMoney, VisuallyHiddenInput } from "../utils/helpers";
import RegionalReports from "./RegionalReports";

function App() {
  const [loanDisbursementData, setLoanDisbursementData] = useState<RowData[]>([]);
  const [sortedRegionsLoanDistribution, setSortedRegionsLoanDistribution] = useState<Record<string, ILoanDisbursement[]>>({});
  const [sortedRegionsDeposits, setSortedRegionsDeposits] = useState<Record<string, IDeposit[]>>({});
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const groupByRegionLoanDisbursment = (data: ILoanDisbursement[]): Record<string, ILoanDisbursement[]> => {
    return data.reduce((acc: Record<string, ILoanDisbursement[]>, obj) => {
      const regionName = obj.BU_NM;
      if (!acc[regionName]) {
        acc[regionName] = [];
      }
      acc[regionName].push(obj);
      return acc;
    }, {});
  }

  const groupByRegionDeposits = (data: IDeposit[]): Record<string, IDeposit[]> => {
    return data.reduce((acc: Record<string, IDeposit[]>, obj) => {
      const regionName = obj.BU_NM;
      if (!acc[regionName]) {
        acc[regionName] = [];
      }
      acc[regionName].push(obj);
      return acc;
    }, {});
  }

  const handleSubmit = async (files: Array<File>) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await sendEmailService(formData);
      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleLoandDisbursementFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsBinaryString(files[0]);
      reader.onload = (event) => {
        const binaryStr = event.target?.result;
        if (binaryStr) {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json<RowData>(sheet) as unknown as Array<ILoanDisbursement>;
          const sortedRegionsLoanDistribution = groupByRegionLoanDisbursment(parsedData);
          setSortedRegionsLoanDistribution(sortedRegionsLoanDistribution);
          setLoanDisbursementData(parsedData);
        }
      };
    }
  };

  const handleLoandDepositsFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsBinaryString(files[0]);
      reader.onload = (event) => {
        const binaryStr = event.target?.result;
        if (binaryStr) {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json<RowData>(sheet) as unknown as Array<IDeposit>;
          const sortedRegionsDeposits = groupByRegionDeposits(parsedData);
          setSortedRegionsDeposits(sortedRegionsDeposits);
        }
      };
    }
  };

  const createObjectsForPDFs = () => {
    const files: File[] = [];

    if (Object.keys(sortedRegionsLoanDistribution).length > 0 && Object.keys(sortedRegionsDeposits).length > 0) {

      Object.entries(sortedRegionsLoanDistribution).forEach(([regionName, loanData]) => {

        const depositData = sortedRegionsDeposits[regionName] || [];

        const loanColumns = Object.keys(loanData[0]).slice(2, 13);
        const loanRows = loanData.map(obj => Object.values(obj).slice(2, 13).map(value => typeof value === 'number' ? formatAsMoney(value) : value));

        const depositColumns = Object.keys(depositData[0] || {}).slice(2);
        const depositRows = depositData.map(obj => Object.values(obj).slice(2).map(value => typeof value === 'number' ? formatAsMoney(value) : value));

        const pdf = generatePDF(loanColumns, loanRows, depositColumns, depositRows, regionName);
        files.push(pdf);
      });

      setSortedRegionsLoanDistribution({});
      setSortedRegionsDeposits({});
    }

    if (files.length > 0) {
      handleSubmit(files);
    }

    return files;
  };

  useEffect(() => {
    if (Object.keys(sortedRegionsLoanDistribution).length > 0 && Object.keys(sortedRegionsDeposits).length > 0) {
      createObjectsForPDFs();
    }
    // eslint-disable-next-line
  }, [sortedRegionsLoanDistribution, sortedRegionsDeposits]);

  return (
    <div className="App">
      <BasicTabs value={value} handleChange={handleChange}>
        <CustomTabPanel value={value} index={0}>
          <Grid container xs={6}>
            <Grid item xs={6} spacing={3} sx={{ px: 3 }}>
              <Button
                component="label"
                variant="contained"
                sx={{ mb: 3, width: "100%" }}
                startIcon={<CloudUploadIcon />}
              >
                Loan Disbursement Upload
                <VisuallyHiddenInput
                  onChange={handleLoandDisbursementFileUpload}
                  accept=".xlsx, .xls, .csv"
                  type="file" />
              </Button>
            </Grid>
            <Grid item xs={6} spacing={3} sx={{ px: 3 }}>
              <Button
                component="label"
                variant="contained"
                sx={{ mb: 3, width: "100%" }}
                startIcon={<CloudUploadIcon />}
              >
                Deposits Report
                <VisuallyHiddenInput
                  onChange={handleLoandDepositsFileUpload}
                  accept=".xlsx, .xls, .csv"
                  type="file" />
              </Button>
            </Grid>
            <Grid item xs={6} spacing={3} sx={{ px: 3 }}>
              <Button
                component="label"
                variant="contained"
                sx={{ mb: 3, width: "100%" }}
                startIcon={<CloudUploadIcon />}
              >
                Branch Report
                <VisuallyHiddenInput
                  // onChange={handleLoandDepositsFileUpload}
                  accept=".xlsx, .xls, .csv"
                  type="file" />
              </Button>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RegionalReports />
        </CustomTabPanel>
      </BasicTabs>
      {
        loanDisbursementData.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Object.keys(loanDisbursementData[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loanDisbursementData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.values(row).map((value, index) => (
                      <TableCell key={index}>{typeof value === 'number' ? formatAsMoney(value) : value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </div >
  );
}

export default App;
