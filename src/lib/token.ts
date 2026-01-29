import Cookies from 'js-cookie';
import { Base64 } from 'js-base64';
import { jwtDecode } from 'jwt-decode';
import { initialJwtAuth, type TJwtAuth } from '@/types/jwtAuth';

const ACCESS_TOKEN = 'access-token';

export const saveTokens = async (
    accessToken: string,
) => {

    Cookies.set(
        ACCESS_TOKEN,
        Base64.encode(accessToken),
        { expires: 0.01, path: '/' } // ±15 menit
    );
};


export const getAccessToken = async (): Promise<string | undefined> => {
    const token = Cookies.get(ACCESS_TOKEN);
    return token ? Base64.decode(token) : undefined;
};


export const clearAuth = async () => {
    Cookies.remove(ACCESS_TOKEN, { path: '/' });
};


export const authStatus = (): boolean => {
    return !!Cookies.get(ACCESS_TOKEN);
};


export const getTokenInfo = async (): Promise<TJwtAuth> => {
    const token = await getAccessToken();
    return token ? jwtDecode<TJwtAuth>(token) : initialJwtAuth;
};
