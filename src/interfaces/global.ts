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
