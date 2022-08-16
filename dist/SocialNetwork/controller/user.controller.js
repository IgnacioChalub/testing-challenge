"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const dto_1 = require("../../models/socialNetwork/dto");
const common_1 = require("@nestjs/common");
const service_1 = require("../service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        return await this.userService.create(createUserDto);
    }
    async createPost(createPostDto) {
        return await this.userService.createPost(createPostDto);
    }
    async follow(followDto) {
        return await this.userService.follow(followDto);
    }
    async getPosts(getPostsDto) {
        return await this.userService.getPosts(getPostsDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../models/socialNetwork/entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('create-post'),
    openapi.ApiResponse({ status: 201, type: require("../../models/socialNetwork/entities/post.entity").Post }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)('follow'),
    openapi.ApiResponse({ status: 201, type: require("../../models/socialNetwork/entities/follower.entity").Follower }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FollowDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "follow", null);
__decorate([
    (0, common_1.Get)('posts'),
    openapi.ApiResponse({ status: 200, type: [require("../../models/socialNetwork/entities/post.entity").Post] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetPostsDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPosts", null);
UserController = __decorate([
    (0, common_1.Controller)("user"),
    __param(0, (0, common_1.Inject)(service_1.IUserService)),
    __metadata("design:paramtypes", [service_1.IUserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map