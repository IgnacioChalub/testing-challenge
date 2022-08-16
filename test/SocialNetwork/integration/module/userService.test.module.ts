import { Module } from "@nestjs/common";
import { UserController } from "@SocialNetwork/controller";
import { FollowersRepository, IFollowersRepository, IPostRepository, IUserRepository, PostRepository, UserRepository } from "@SocialNetwork/repository";
import { IUserService, UserService } from "@SocialNetwork/service";
import { SharedTestModule } from "../../../shared.test.module";

const userServiceProvider = {
    provide: IUserService, 
    useClass: UserService 
}
const userRepositoryProvider = {
    provide: IUserRepository,
    useClass: UserRepository
}
const postRepositoryProvider = {
    provide: IPostRepository,
    useClass: PostRepository
}
const followersRepositoryProvider = {
    provide: IFollowersRepository,
    useClass: FollowersRepository
}

@Module({
    imports: [
        SharedTestModule
      ],
    controllers: [UserController],
    providers: [
        userServiceProvider,
        userRepositoryProvider,
        postRepositoryProvider,
        followersRepositoryProvider
    ],
  })
  export class UserServiceTestModule {}
