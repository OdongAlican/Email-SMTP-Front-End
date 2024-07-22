import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import { determineDepositsColumnHeaders, determineLoanDisBurseMentColumnHeaders, determineRegionalReportHeaders, formatAsMoney } from './helpers';

export const generatePDF = (
    loanColumns,
    loanRows,
    depositColumns,
    depositRows,
    reportsColumns,
    reportsRows,
    branchName,
    sums
) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const date = new Date();
    const formattedDate = moment(date.setDate(date.getDate() - 1)).format('MMMM Do YYYY');
    sums[0] = "TOTAL";

    doc.text(`Loans Disbursed for ${branchName} Branch on ${formattedDate}`, 15, 10);
    doc.autoTable({
        head: [determineLoanDisBurseMentColumnHeaders(loanColumns)],
        body: loanRows,
        startY: 20,
        theme: 'grid'
    });

    doc.text(`Deposits for ${branchName} Branch on ${formattedDate}`, 15, doc.autoTable.previous.finalY + 25);
    doc.autoTable({
        head: [determineDepositsColumnHeaders(depositColumns)],
        body: depositRows,
        startY: doc.autoTable.previous.finalY + 30,
        theme: 'grid'
    });

    doc.text(`Branch Reports for ${branchName} Branch on ${formattedDate}`, 15, doc.autoTable.previous.finalY + 25);
    const sumRow = sums.map(value => typeof value === 'number' ? formatAsMoney(value) : value);
    doc.autoTable({
        head: [determineRegionalReportHeaders(reportsColumns)],
        body: reportsRows,
        foot: [sumRow],
        startY: doc.autoTable.previous.finalY + 30,
        theme: 'grid',
        showFoot: "lastPage",
    });

    doc.save(`${branchName.split(" ").join("_")}_data.pdf`);

    // Optionally, return the PDF as a File object
    // const pdfBlob = doc.output('blob');
    // const file = new File([pdfBlob], `${branchName.split(" ").join("_")}_data.pdf`, { type: 'application/pdf' });

    // return file;
};
