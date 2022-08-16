import { CreatePostDto, CreateUserDto, FollowDto, GetPostsDto} from "@models/socialNetwork/dto";
import { Follower, Post, User } from "@models/socialNetwork/entities";

export abstract class IUserService {
    abstract create(createUserDto: CreateUserDto): Promise<User>;
    abstract createPost(createPostDto: CreatePostDto): Promise<Post>;
    abstract follow(followDto: FollowDto): Promise<Follower>;
    abstract getPosts(getPostsDto: GetPostsDto): Promise<Post[]>;
}