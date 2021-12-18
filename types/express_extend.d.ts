declare namespace Express {
    export interface GenericResponse {
        data: unknown;
        code?: number;
        message?: string;
    }
    export interface Response {
        success(value: GenericResponse): void;
    }
}
