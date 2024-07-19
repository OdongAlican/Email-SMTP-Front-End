import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import { determineDepositsColumnHeaders, determineLoanDisBurseMentColumnHeaders } from './helpers';

export const generatePDF = (loanColumns, loanRows, depositColumns, depositRows, branchName) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const date = new Date();
    const formattedDate = moment(date.setDate(date.getDate() - 1)).format('MMMM Do YYYY');

    doc.text(`Loans Disbursed for ${branchName} Branch on ${formattedDate}`, 15, 10);
    doc.autoTable({
        head: [determineLoanDisBurseMentColumnHeaders(loanColumns)],
        body: loanRows,
        startY: 20,
        theme: 'grid'
    });

    doc.text(`Deposits for ${branchName} Branch on ${formattedDate}`, 15, doc.autoTable.previous.finalY + 30);
    doc.autoTable({
        head: [determineDepositsColumnHeaders(depositColumns)],
        body: depositRows,
        startY: doc.autoTable.previous.finalY + 40,
        theme: 'grid'
    });

    const pdfBlob = doc.output('blob');
    const file = new File([pdfBlob], `${branchName.split(" ").join("_")}_data`, { type: 'application/pdf' });

    return file;
};
