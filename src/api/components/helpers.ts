import { apiResponse } from "@interfaces/global";

export function JSONresponse(success: boolean, status: number, data: { [key: string]: any; } | string): apiResponse {
    return {
        success: success,
        status: status,
        result: data
    }
}

/* API Pagination helpers */

function getPage(query: any) {
    return query.page ? parseInt(query.page as string) : 0;
}

function getLimit(query: any) {
    return query.limit ? parseInt(query.limit as string) : 0;
}

function getSkipIndex(page: number, limit: number) {
    return page > 0 ? (page - 1) * limit : page * limit;
}

export function getPagination(query: any) {
    const page= getPage(query);
    const limit = getLimit(query);
    const skipIndex = getSkipIndex(page, limit);

    return {
        limit: limit,
        skipIndex: skipIndex
    }
}
