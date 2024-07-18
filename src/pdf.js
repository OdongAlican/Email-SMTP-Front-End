import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (columns, rows, branchName) => {
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.text(`Loans Disbursed for ${branchName} Branch on 17th July 2024`, 10, 10);

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid'
    });

    const pdfBlob = doc.output('blob');

    const file = new File([pdfBlob], `${branchName.split(" ").join("_")}_data`, { type: 'application/pdf' });

    return file;
};

