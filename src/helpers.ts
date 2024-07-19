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
            col === "NO_OF_ACCT" ? ("NUMBER OF ACCOUNT").toUpperCase() :
                col === "DR_TURNOVER" ? ("DEBIT TURN OVER").toUpperCase() :
                    col === "CR_TURNOVER" ? ("CREDIT TURN OVER").toUpperCase() :
                        col === "CR_INT_ACCRUED" ? ("CREDIT INTEREST ACCRUED").toUpperCase() :
                            col === "CREDIT_LEDGER_BAL" ? ("LEDGER BALANCE").toUpperCase()
                                : col.toUpperCase();


    });
}
