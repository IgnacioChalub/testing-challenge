import { HttpException } from '@nestjs/common';
export declare class ApiError extends HttpException {
    readonly code: number;
    readonly message: string;
    constructor(code: number, message: string);
}
export declare class InvalidModelError extends ApiError {
    constructor(model: string);
}
export declare class ValidationError extends ApiError {
    constructor(model: string, field: string, message: string);
}
export declare class NotFoundError extends ApiError {
    constructor(model: string);
}
export declare class NotAuthorizedError extends ApiError {
    constructor();
}
export declare class FollowersLimitError extends ApiError {
    constructor();
}
export declare class InvalidPostError extends ApiError {
    constructor(message: string);
}
export declare class ResourceAlreadyExistsError extends ApiError {
    constructor(model: string);
}
