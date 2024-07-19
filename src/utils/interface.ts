import React from "react";

export interface ILoanDisbursement {
  BU_NM: string;
  CREDIT_OFFICER: string;
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

export interface IDeposit {
  BU_NM: string;
  PROD_DESC: string;
  DR_TURNOVER: number;
  CR_TURNOVER: number;
  CR_INT_ACCRUED: number;
  NO_OF_ACCT: number;
  CREDIT_LEDGER_BAL: number;
}

export type RowData = {
  [key: string]: any;
};


export interface IBasicTabs {
  children: React.ReactNode
  handleChange: (event: React.SyntheticEvent, newValue: number) => void
  value: number
}
