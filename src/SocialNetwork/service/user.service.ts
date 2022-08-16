import { CreatePostDto, CreateUserDto, FollowDto, GetPostsDto } from "@models/socialNetwork/dto";
import { Follower, Post, User } from "@models/socialNetwork/entities";
import { Inject } from "@nestjs/common";
import { FollowersLimitError, InvalidPostError, NotAuthorizedError } from "@shared/errors";
import { IPostRepository, IUserRepository } from "@SocialNetwork/repository";
import { IFollowersRepository } from "@SocialNetwork/repository/followers.repository.interface";
import { IUserService } from "./user.service.interface";

export class UserService implements IUserService {
    
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject(IFollowersRepository)
        private readonly followerRepository: IFollowersRepository,
    ) {}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(createUserDto)
    }

    async createPost(createPostDto: CreatePostDto): Promise<Post> {
        const text = createPostDto.text;
        if(text[0].toUpperCase() != text[0]) throw new InvalidPostError("First letter should be upper case");
        if(text[text.length-1] != '.') throw new InvalidPostError('Post should finish with point');
        if(text.includes(createPostDto.userId)) throw new InvalidPostError('Post can not include user id');
        return await this.postRepository.create(createPostDto);
    }

    async follow(followDto: FollowDto): Promise<Follower> {
        const followed = await this.userRepository.findWithFollowersAndPosts(followDto.followedId);
        if(followed.followers.length >= 4) throw new FollowersLimitError();
        return await this.followerRepository.create(followDto);
    }

    async getPosts(getPostsDto: GetPostsDto): Promise<Post[]> {
        const postsOwner = await this.userRepository.findWithFollowersAndPosts(getPostsDto.postsOwnerId);
        if(getPostsDto.userId != getPostsDto.postsOwnerId && postsOwner.private && !this.checkFollowsOwner(postsOwner.followers, getPostsDto.userId)) {
            throw new NotAuthorizedError();
        }
        return postsOwner.posts;
    }

    private checkFollowsOwner(followers: Follower[], userId: string): boolean {
        for (const follower of followers) {
            if(follower.follower.id == userId) return true;
        }
        return false;
    }


} 