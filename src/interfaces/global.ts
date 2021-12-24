export interface error extends Error {
    status: number;
    keyValue: Object;
    code: number;
    errors: any
}

export interface dbData {
    type: string;
    port?: Number;
    host: string;
    name: string;
    user?: string;
    pass?: string;
}

export interface apiResponse {
    success: boolean,
    status: number,
    result?: { [key: string]: any; } | string,
    message?: string
}

declare module 'express-session' {
    export interface SessionData {
        username: { [key: string]: any };
        role: { [key: string]: any } | string;
    }
}
declare global {
    namespace Express {
        interface Request {
            decoded: string;
        }
    }
}
