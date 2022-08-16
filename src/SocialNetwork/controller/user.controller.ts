import { CreatePostDto, CreateUserDto, FollowDto, GetPostsDto } from "@models/socialNetwork/dto";
import { User, Post as PostEntity, Follower } from "@models/socialNetwork/entities";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { IUserService } from "@SocialNetwork/service";

@Controller("user")
export class UserController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Post('create-post')
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.userService.createPost(createPostDto);
  }

  @Post('follow')
  async follow(@Body() followDto: FollowDto): Promise<Follower> {
    return await this.userService.follow(followDto);
  } 

  @Get('posts')
  async getPosts(@Body() getPostsDto: GetPostsDto): Promise<PostEntity[]> {
    return await this.userService.getPosts(getPostsDto);
  } 

}