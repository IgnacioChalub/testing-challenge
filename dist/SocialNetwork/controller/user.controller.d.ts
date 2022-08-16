import { CreatePostDto, CreateUserDto, FollowDto, GetPostsDto } from "@models/socialNetwork/dto";
import { User, Post as PostEntity, Follower } from "@models/socialNetwork/entities";
import { IUserService } from "@SocialNetwork/service";
export declare class UserController {
    private readonly userService;
    constructor(userService: IUserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    createPost(createPostDto: CreatePostDto): Promise<PostEntity>;
    follow(followDto: FollowDto): Promise<Follower>;
    getPosts(getPostsDto: GetPostsDto): Promise<PostEntity[]>;
}
