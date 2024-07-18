import { useState } from "react";
import * as XLSX from "xlsx";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from "@mui/material";

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
  REGION_CD: number;
  REGION_NAME: string;
  BU_NO: number;
  BU_NM: string;
  ACCT_NO: number;
}

type RowData = {
  [key: string]: any;
};

function App() {
  const [data, setData] = useState<RowData[]>([]);
  const [sortedRegions, setSortedRegions] = useState<Record<string, MyObject[]>>({} as Record<string, MyObject[]>);

  const groupByRegion = (data: MyObject[]): Record<string, MyObject[]> => {
    return data.reduce((acc: Record<string, MyObject[]>, obj) => {
      const regionName = obj.REGION_NAME;
      if (!acc[regionName]) {
        acc[regionName] = [];
      }
      acc[regionName].push(obj);
      return acc;
    }, {});
  }


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

  console.log(sortedRegions, "sortedRegions!!");
  
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
            {/* <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.values(row).map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default App;
