import { CreatePostDto, CreateUserDto, FollowDto, GetPostsDto } from "@models/socialNetwork/dto";
import { Follower, Post, User } from "@models/socialNetwork/entities";
import { IPostRepository, IUserRepository } from "@SocialNetwork/repository";
import { IFollowersRepository } from "@SocialNetwork/repository/followers.repository.interface";
import { IUserService } from "./user.service.interface";
export declare class UserService implements IUserService {
    private readonly userRepository;
    private readonly postRepository;
    private readonly followerRepository;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, followerRepository: IFollowersRepository);
    create(createUserDto: CreateUserDto): Promise<User>;
    createPost(createPostDto: CreatePostDto): Promise<Post>;
    follow(followDto: FollowDto): Promise<Follower>;
    getPosts(getPostsDto: GetPostsDto): Promise<Post[]>;
    private checkFollowsOwner;
}
