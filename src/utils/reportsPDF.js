import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatAsMoney } from './helpers';

export const generateReportsPDF = (columns, rows, branchName, sums) => {
    const doc = new jsPDF({ orientation: 'landscape' });

    sums[0] = "TOTAL";
    
    doc.text(`Loans Disbursed for ${branchName} Branch on 17th July 2024`, 10, 10);

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
