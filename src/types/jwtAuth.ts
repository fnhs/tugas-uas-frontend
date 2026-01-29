export interface TJwtAuth {
    userId: string;
    role: string;
    iat: number;
    exp: number;
}

export const initialJwtAuth: TJwtAuth = {
    userId: '',
    role: '',
    iat: 0,
    exp: 0
}