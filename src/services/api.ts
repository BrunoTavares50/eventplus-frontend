import axios from "axios";

export const axiosInstance = axios.create(
    {
        baseURL: "https://localhost:7182/api/",
        timeout: 15000,
        headers: {
            Accept: "application/json"
        }
    }
)