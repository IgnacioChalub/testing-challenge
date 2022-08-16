"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follower = void 0;
const openapi = require("@nestjs/swagger");
class Follower {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, follower: { required: false, type: () => require("./user.entity").User }, followed: { required: false, type: () => require("./user.entity").User }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
}
exports.Follower = Follower;
//# sourceMappingURL=follower.entity.js.map