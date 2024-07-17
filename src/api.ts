import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1/send-emails";

export const AxiosInstance = axios.create({
    headers: {
        Accept: "application/json"
    }
});


export const fetchAllDocuments = async () => {
    try {
        const response = await AxiosInstance.get(`${baseUrl}`);
        return response;
    } catch (error) {
        return error;
    }
}
