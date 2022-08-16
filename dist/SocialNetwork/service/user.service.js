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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const errors_1 = require("../../shared/errors");
const repository_1 = require("../repository");
const followers_repository_interface_1 = require("../repository/followers.repository.interface");
let UserService = class UserService {
    constructor(userRepository, postRepository, followerRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.followerRepository = followerRepository;
    }
    async create(createUserDto) {
        return await this.userRepository.create(createUserDto);
    }
    async createPost(createPostDto) {
        const text = createPostDto.text;
        if (text[0].toUpperCase() != text[0])
            throw new errors_1.InvalidPostError("First letter should be upper case");
        if (text[text.length - 1] != '.')
            throw new errors_1.InvalidPostError('Post should finish with point');
        if (text.includes(createPostDto.userId))
            throw new errors_1.InvalidPostError('Post can not include user id');
        return await this.postRepository.create(createPostDto);
    }
    async follow(followDto) {
        const followed = await this.userRepository.findWithFollowersAndPosts(followDto.followedId);
        if (followed.followers.length >= 4)
            throw new errors_1.FollowersLimitError();
        return await this.followerRepository.create(followDto);
    }
    async getPosts(getPostsDto) {
        const postsOwner = await this.userRepository.findWithFollowersAndPosts(getPostsDto.postsOwnerId);
        if (getPostsDto.userId != getPostsDto.postsOwnerId && postsOwner.private && !this.checkFollowsOwner(postsOwner.followers, getPostsDto.userId)) {
            throw new errors_1.NotAuthorizedError();
        }
        return postsOwner.posts;
    }
    checkFollowsOwner(followers, userId) {
        for (const follower of followers) {
            if (follower.follower.id == userId)
                return true;
        }
        return false;
    }
};
UserService = __decorate([
    __param(0, (0, common_1.Inject)(repository_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(repository_1.IPostRepository)),
    __param(2, (0, common_1.Inject)(followers_repository_interface_1.IFollowersRepository)),
    __metadata("design:paramtypes", [repository_1.IUserRepository,
        repository_1.IPostRepository,
        followers_repository_interface_1.IFollowersRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map