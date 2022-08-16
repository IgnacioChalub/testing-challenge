"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAlreadyExistsError = exports.InvalidPostError = exports.FollowersLimitError = exports.NotAuthorizedError = exports.NotFoundError = exports.ValidationError = exports.InvalidModelError = exports.ApiError = void 0;
const common_1 = require("@nestjs/common");
class ApiError extends common_1.HttpException {
    constructor(code, message) {
        super(message, code);
        this.code = code;
        this.message = message;
    }
}
exports.ApiError = ApiError;
class InvalidModelError extends ApiError {
    constructor(model) {
        super(common_1.HttpStatus.INTERNAL_SERVER_ERROR, `Invalid Model Error: model ${model} is invalid`);
    }
}
exports.InvalidModelError = InvalidModelError;
class ValidationError extends ApiError {
    constructor(model, field, message) {
        super(common_1.HttpStatus.BAD_REQUEST, `Validation Error: model ${model} field ${field} ${message}`);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends ApiError {
    constructor(model) {
        super(common_1.HttpStatus.NOT_FOUND, `Not Found Error: ${model} not found`);
    }
}
exports.NotFoundError = NotFoundError;
class NotAuthorizedError extends ApiError {
    constructor() {
        super(common_1.HttpStatus.NOT_FOUND, `User not authorized`);
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
class FollowersLimitError extends ApiError {
    constructor() {
        super(common_1.HttpStatus.BAD_REQUEST, `User already reached max followers`);
    }
}
exports.FollowersLimitError = FollowersLimitError;
class InvalidPostError extends ApiError {
    constructor(message) {
        super(common_1.HttpStatus.BAD_REQUEST, message);
    }
}
exports.InvalidPostError = InvalidPostError;
class ResourceAlreadyExistsError extends ApiError {
    constructor(model) {
        super(common_1.HttpStatus.CONFLICT, `${model} already exists`);
    }
}
exports.ResourceAlreadyExistsError = ResourceAlreadyExistsError;
//# sourceMappingURL=errors.js.map