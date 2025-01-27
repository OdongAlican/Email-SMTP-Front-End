import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from "@mui/material";
import { generatePDF } from "./pdf";
import { sendEmailService } from "./api";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface MyObject {
  BU_NM: string;
  ACCT_NO: number;
  DIBS_MAFL: number;
  DIBS_CLEAN_ENERGY: number;
  DIBS_GGLS: number;
  DIBS_SGL: number;
  DIBS_CB: number;
  DIBS_SALARY_ADV: number;
  DIBS_BL: number;
  DIBS_SCH_FEES: number;
  DIBS_AGRIC: number;
  DIBS_PHL: number;
}

type RowData = {
  [key: string]: any;
};

function formatAsMoney(value: number) {
  return value.toLocaleString('en-UG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function App() {
  const [data, setData] = useState<RowData[]>([]);
  const [sortedRegions, setSortedRegions] = useState<Record<string, MyObject[]>>({} as Record<string, MyObject[]>);

  const groupByRegion = (data: MyObject[]): Record<string, MyObject[]> => {
    return data.reduce((acc: Record<string, MyObject[]>, obj) => {
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          const parsedData = XLSX.utils.sheet_to_json<RowData>(sheet) as unknown as Array<MyObject>;
          const sortedRegions = groupByRegion(parsedData);
          setSortedRegions(sortedRegions)
          setData(parsedData);
        }
      };
    }
  };

  const createObjectsForPDFs = () => {
    const files: File[] = [];

    if (Object.keys(sortedRegions).length > 0) {
      Object.entries(sortedRegions).forEach(([regionName, regionData]) => {
        const columns = Object.keys(regionData[0]).slice(2, 13);
        const rows = regionData.map(obj => Object.values(obj).slice(2, 13).map(value => typeof value === 'number' ? formatAsMoney(value) : value));

        const pdf = generatePDF(columns, rows, regionName);
        files.push(pdf);
      });

      setSortedRegions({});
    }
    if (files.length > 0) {
      handleSubmit(files);
    }
    return files;
  };

  useEffect(() => {
    if (Object.keys(sortedRegions).length > 0) {
      createObjectsForPDFs();
    }
  }, [sortedRegions]);

  return (
    <div className="App">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        sx={{ mb: 3 }}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          onChange={handleFileUpload}
          accept=".xlsx, .xls, .csv"
          type="file" />
      </Button>

      {data.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
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
      )}
    </div>
  );
}

export default App;
