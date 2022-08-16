"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialNetworkModule = void 0;
const common_1 = require("@nestjs/common");
const shared_module_1 = require("../shared/shared.module");
const controller_1 = require("./controller");
const repository_1 = require("./repository");
const followers_repository_1 = require("./repository/followers.repository");
const followers_repository_interface_1 = require("./repository/followers.repository.interface");
const service_1 = require("./service");
const userServiceProvider = {
    provide: service_1.IUserService,
    useClass: service_1.UserService
};
const userRepositoryProvider = {
    provide: repository_1.IUserRepository,
    useClass: repository_1.UserRepository
};
const postRepositoryProvider = {
    provide: repository_1.IPostRepository,
    useClass: repository_1.PostRepository
};
const followersRepositoryProvider = {
    provide: followers_repository_interface_1.IFollowersRepository,
    useClass: followers_repository_1.FollowersRepository
};
let SocialNetworkModule = class SocialNetworkModule {
};
SocialNetworkModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule],
        controllers: [controller_1.UserController],
        providers: [
            userServiceProvider,
            userRepositoryProvider,
            postRepositoryProvider,
            followersRepositoryProvider
        ],
    })
], SocialNetworkModule);
exports.SocialNetworkModule = SocialNetworkModule;
//# sourceMappingURL=socialNetwork.module.js.map