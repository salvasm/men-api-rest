class HttpException extends Error {
    success: boolean;
    status: number;
    message: string;
    constructor(status: number, message: string) {
        super();
        this.success = false;
        this.status = status;
        this.message = message;
    }
}

export default HttpException;