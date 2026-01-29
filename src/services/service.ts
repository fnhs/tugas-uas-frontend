import { callAPI } from "@/config/api";
import { BASE_API } from "@/config/constant";

export const signup = async (data: any) => {
    const url = `${BASE_API}/api/auth/signup`;
    return await callAPI({
        url,
        method: "POST",
        data,
    });
}

export const signin = async (data: any) => {
    const url = `${BASE_API}/api/auth/signin`;
    return await callAPI({
        url,
        method: "POST",
        data,
    });
}
