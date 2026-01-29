import { getAccessToken } from '@/lib/token';
import axios, { type AxiosRequestConfig } from 'axios';

const axiosJWT = axios.create();


export async function callAPI(config: AxiosRequestConfig) {
    const response = await axios(config).catch((err: any) => err.response);
    if (response.status > 300) {
        const res = {
            code: response.status,
            error: true,
            message: response.data.message,
            data: null,
        };
        return res;

    } else {

        const res = {
            code: response.status,
            error: false,
            message: response.data.message,
            data: response.data.data,
        };
        return res;
    }
}


export async function callAPIWhiteToken(config: AxiosRequestConfig) {
    try {

        const token = await getAccessToken();
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };

        const response = await axiosJWT(config);

        return {
            code: response.status,
            error: false,
            message: response.data.message,
            data: response.data,
        };
    } catch (error: any) {
        return {
            code: error.response?.status,
            error: true,
            message: error.response?.data?.message ?? "Unknown error",
            data: null,
        };
    }
}
