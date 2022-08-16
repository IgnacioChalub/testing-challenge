import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { UserController } from './controller';
import { IPostRepository, IUserRepository, PostRepository, UserRepository } from './repository';
import { FollowersRepository } from './repository/followers.repository';
import { IFollowersRepository } from './repository/followers.repository.interface';
import { IUserService, UserService } from './service';

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
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
    userServiceProvider,
    userRepositoryProvider,
    postRepositoryProvider,
    followersRepositoryProvider
  ],
})
export class SocialNetworkModule {}
