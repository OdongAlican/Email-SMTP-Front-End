
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from "@mui/material";
import { formatAsMoney, VisuallyHiddenInput } from "../utils/helpers";
import FormHelpers from './FormHelpers';

const RegionalReports = () => {
    const { data, handleFileUpload } = FormHelpers();

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
                Branch Report
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

export default RegionalReports;