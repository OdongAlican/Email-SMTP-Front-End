// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// export const generatePDF = (jsonData) => {
//     const doc = new jsPDF();

//     const columns = Object.keys(jsonData[0]);
//     const rows = jsonData.map(obj => Object.values(obj));

//     doc.text('Customer Data', 10, 10);

//     doc.autoTable({
//         head: [columns],
//         body: rows,
//         startY: 20,
//         theme: 'grid'
//     });

//     console.log("Pdf document!!!", doc.output())

//     doc.save('customer_data.pdf');
// };


import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Function to generate PDF for a region and return it as a File object
export const generatePDF = (columns, rows, regionName) => {
    const doc = new jsPDF();

    doc.text(regionName, 10, 10); // Display region name as title

    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
        theme: 'grid'
    });

    // Convert the PDF to a blob
    const pdfBlob = doc.output('blob');

    // Create a File object with the blob and specify the filename
    const file = new File([pdfBlob], `${regionName.split(" ").join("_")}_data`, { type: 'application/pdf' });

    return file; // Return the File object
};

