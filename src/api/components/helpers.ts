import { apiResponse } from "@interfaces/global";

export function JSONresponse(success: boolean, status: number, data: { [key: string]: any; } | string): apiResponse {
    return {
        success: success,
        status: status,
        result: data
    }
}
