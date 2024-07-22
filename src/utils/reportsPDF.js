import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatAsMoney } from './helpers';
import moment from 'moment';

export const generateReportsPDF = (columns, rows, branchName, sums) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const date = new Date();
    const formattedDate = moment(date.setDate(date.getDate() - 1)).format('MMMM Do YYYY');

    sums[0] = "TOTAL";

    doc.text(`Loans Disbursed for ${branchName} Branch on ${formattedDate}`, 15, 10);

    const sumRow = sums.map(value => typeof value === 'number' ? formatAsMoney(value) : value);

    doc.autoTable({
        head: [columns],
        body: rows,
        foot: [sumRow],
        startY: 20,
        theme: 'grid',
        showFoot: "lastPage",
    });

    doc.save(`${branchName.split(" ").join("_")}_data.pdf`);
};
