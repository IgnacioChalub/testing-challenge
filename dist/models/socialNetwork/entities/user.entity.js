"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, username: { required: true, type: () => String }, private: { required: true, type: () => Boolean }, posts: { required: false, type: () => [require("./post.entity").Post] }, followers: { required: false, type: () => [require("./follower.entity").Follower] }, following: { required: false, type: () => [require("./follower.entity").Follower] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map