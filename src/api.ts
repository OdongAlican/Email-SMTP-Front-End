import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1/send-emails";

export const sendEmailService = async (body: FormData): Promise<any> => {
    try {
        const response = await axios.post(baseUrl, body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};