import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateReportsPDF = (columns, rows, branchName) => {
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.text(`Loans Disbursed for ${branchName} Branch on 17th July 2024`, 10, 10);

    const customHeaders = columns.map(col => {
        return col === "CREDIT_OFFICER" ? ("RO").toUpperCase() :
            col === "DIBS_MAFL" ? ("MALF").toUpperCase() :
                col === "DIBS_CLEAN_ENERGY" ? ("CLEAN ENERGY").toUpperCase() :
                    col === "DIBS_GGLS" ? ("GGLS").toUpperCase() :
                        col === "DIBS_SGL" ? ("Salary Guarantee").toUpperCase() :
                            col === "DIBS_CB" ? ("Community Banking").toUpperCase() :
                                col === "DIBS_SALARY_ADV" ? ("Salary Advance").toUpperCase() :
                                    col === "DIBS_BL" ? ("Business Loan").toUpperCase() :
                                        col === "DIBS_SCH_FEES" ? ("School Fees").toUpperCase() :
                                            col === "DIBS_AGRIC" ? ("Agriculture").toUpperCase() :
                                                col === "DIBS_PHL" ? ("Housing").toUpperCase()
                                                    : col.toUpperCase();
    });

    doc.autoTable({
        head: [customHeaders],
        body: rows,
        startY: 20,
        theme: 'grid'
    });

    const pdfBlob = doc.output('blob');

    const file = new File([pdfBlob], `${branchName.split(" ").join("_")}_data`, { type: 'application/pdf' });

    return file;
};
