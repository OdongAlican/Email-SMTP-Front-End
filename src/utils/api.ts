import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1";

export const sendEmailService = async (body: FormData): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/send-emails`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendReportsService = async (body: FormData): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/send-reports`, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};