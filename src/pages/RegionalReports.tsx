import { Button, Grid } from "@mui/material";
import React from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "../utils/helpers";

const RegionalReports = () => {
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={6}>
                    <Button
                        component="label"
                        variant="contained"
                        sx={{ mb: 3 }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Combined Reports Upload
                        <VisuallyHiddenInput
                            // onChange={handleLoandDisbursementFileUpload}
                            accept=".xlsx, .xls, .csv"
                            type="file" />
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default RegionalReports;