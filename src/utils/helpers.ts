import { styled } from '@mui/material/styles';

export const determineLoanDisBurseMentColumnHeaders = (loanColumns: Array<String>) => {
    return loanColumns.map(col => {
        return col === "CREDIT_OFFICER" ? ("RO").toUpperCase() :
            col === "DIBS_MAFL" ? ("MALF").toUpperCase() :
                col === "DIBS_CLEAN_ENERGY" ? ("CLEAN ENERGY").toUpperCase() :
                    col === "DIBS_GGLS" ? ("GGLS").toUpperCase() :
                        col === "DIBS_SGL" ? ("SALARY GUARANTEE").toUpperCase() :
                            col === "DIBS_CB" ? ("COMMUNITY BANKING").toUpperCase() :
                                col === "DIBS_SALARY_ADV" ? ("SALARY ADVANCE").toUpperCase() :
                                    col === "DIBS_BL" ? ("BUSINESS LOAN").toUpperCase() :
                                        col === "DIBS_SCH_FEES" ? ("SCHOOL FEES").toUpperCase() :
                                            col === "DIBS_AGRIC" ? ("AGRICULTURE").toUpperCase() :
                                                col === "DIBS_PHL" ? ("HOUSING").toUpperCase()
                                                    : col.toUpperCase();


    });
}

export const determineDepositsColumnHeaders = (depositColumns: Array<String>) => {
    return depositColumns.map(col => {
        return col === "PROD_DESC" ? ("PRODUCT").toUpperCase() :
            col === "NO_OF_ACCT" ? ("NUMBER OF ACCOUNTS").toUpperCase() :
                col === "DR_TURNOVER" ? ("DEBIT TURN OVER").toUpperCase() :
                    col === "CR_TURNOVER" ? ("CREDIT TURN OVER").toUpperCase() :
                        col === "CR_INT_ACCRUED" ? ("CREDIT INTEREST ACCRUED").toUpperCase() :
                            col === "CREDIT_LEDGER_BAL" ? ("LEDGER BALANCE").toUpperCase()
                                : col.toUpperCase();


    });
}

export const determineRegionalReportHeaders = (reportsColumns: Array<String>) => {
    return reportsColumns.map(col => {
        return col === "RELATIONSHIP_OFFICER" ? ("RO").toUpperCase() :
            col === "NO_ACCS" ? ("NUMBER OF ACCOUNTS").toUpperCase() :
                col === "LOAN_AMOUNT" ? ("LOAN AMOUNT").toUpperCase() :
                    col === "OUTSTANDINGPRINC" ? ("OUTSTANDING PRINCIPAL").toUpperCase() :
                        col === "TOTAL_SAVINGS" ? ("TOTAL SAVINGS").toUpperCase() :
                            col === "PAR_1DAY" ? ("PAR 1 DAY").toUpperCase() :
                                col === "PAR_30DAYS" ? ("PAR 30 DAYS").toUpperCase() :
                                    col === "PAR_60DAYS" ? ("PAR 60 DAYS").toUpperCase() :
                                        col === "PAR_90DAYS" ? ("PAR 90 DAYS").toUpperCase()
                                            : col.toUpperCase();


    });
}

export const VisuallyHiddenInput = styled('input')({
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

export function formatAsMoney(value: number) {
    return value.toLocaleString('en-UG', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}