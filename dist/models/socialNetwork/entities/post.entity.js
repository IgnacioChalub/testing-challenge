"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const openapi = require("@nestjs/swagger");
class Post {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, text: { required: true, type: () => String }, user: { required: false, type: () => require("./user.entity").User }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
}
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map