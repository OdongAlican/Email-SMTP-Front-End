import React, { useEffect, useState } from 'react'
import { sendReportsService } from '../utils/api';
import * as XLSX from "xlsx";
import { formatAsMoney } from '../utils/helpers';
import { generateReportsPDF } from '../utils/reportsPDF';

interface MyObject {
    BU_NM: string;
    RELATIONSHIP_OFFICER: number;
    NO_ACCS: number;
    LOAN_AMOUNT: number;
    OUTSTANDINGPRINC: number;
    TOTAL_SAVINGS: number;
    PAR_1DAY: number;
    PAR_30DAYS: number;
    PAR_60DAYS: number;
    PAR_90DAYS: number;
}

type RowData = {
    [key: string]: any;
};

const FormHelpers = () => {
    const [data, setData] = useState<RowData[]>([]);
    const [sortedRegionsReports, setSortedRegionsReports] = useState<Record<string, MyObject[]>>({} as Record<string, MyObject[]>);

    const groupByRegion = (data: MyObject[]): Record<string, MyObject[]> => {
        return data.reduce((acc: Record<string, MyObject[]>, obj) => {
            const regionName = obj.BU_NM;
            if (!acc[regionName]) {
                acc[regionName] = [];
            }
            acc[regionName].push(obj);
            return acc;
        }, {});
    }

    const handleSubmit = async (files: Array<File>) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await sendReportsService(formData);
            console.log("Email sent successfully:", response);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.readAsBinaryString(files[0]);
            reader.onload = (event) => {
                const binaryStr = event.target?.result;
                if (binaryStr) {
                    const workbook = XLSX.read(binaryStr, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const parsedData = XLSX.utils.sheet_to_json<RowData>(sheet) as unknown as Array<MyObject>;
                    const sortedRegionsReports = groupByRegion(parsedData);
                    setSortedRegionsReports(sortedRegionsReports)
                    setData(parsedData);
                }
            };
        }
    };

    const createObjectsForPDFs = () => {
        const files: File[] = [];

        if (Object.keys(sortedRegionsReports).length > 0) {
            Object.entries(sortedRegionsReports).forEach(([regionName, regionData]) => {
                const columns = Object.keys(regionData[0]).slice(1, 13);
                const rows = regionData.map(obj => Object.values(obj).slice(1, 13).map(value => typeof value === 'number' ? formatAsMoney(value) : value));

                const sums = new Array(columns.length).fill(0);

                regionData.forEach(obj => {
                    columns.forEach((col, index) => {
                        if (!isNaN(sums[index])) {
                            sums[index] += obj[col as keyof MyObject];
                        }
                    });
                });

                const pdf = generateReportsPDF(columns, rows, regionName, sums);
                // files.push(pdf);
            });

            // setSortedRegionsReports({});
        }

        if (files.length > 0) {
            handleSubmit(files);
        }

        return files;
    };


    useEffect(() => {
        if (Object.keys(sortedRegionsReports).length > 0) {
            createObjectsForPDFs();
        }
    }, [sortedRegionsReports]);

    return ({
        handleFileUpload,
        sortedRegionsReports,
        data,
        setSortedRegionsReports
    }
    )
}

export default FormHelpers