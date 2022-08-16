import { SharedModule } from "@shared/shared.module";
import { Test, TestingModule } from '@nestjs/testing';
import { IUserService, UserService } from "@SocialNetwork/service";
import { IFollowersRepository, IPostRepository, IUserRepository } from "@SocialNetwork/repository";
import { Follower, Post, User } from "@models/socialNetwork/entities";
import { FollowersLimitError, InvalidPostError, NotAuthorizedError } from "@shared/errors";
import { FollowDto, GetPostsDto } from "@models/socialNetwork/dto";
import { DummyFollowersRepository, DummyPostRepository, DummyUserRepository } from "../dummies";

describe('UserService Unit Test', () => {

    let userService: IUserService;
    let userRepository: IUserRepository;
    let postRepository: IPostRepository;
    let followersRepository: IFollowersRepository;
  
    beforeEach(async () => {
        const userServiceProvider = {
            provide: IUserService, 
            useClass: UserService 
        }
        const userRepositoryProvider = {
            provide: IUserRepository,
            useClass: DummyUserRepository
        }
        const postRepositoryProvider = {
            provide: IPostRepository,
            useClass: DummyPostRepository
        }
        const followersRepositoryProvider = {
            provide: IFollowersRepository,
            useClass: DummyFollowersRepository
        }
        const app: TestingModule = await Test.createTestingModule({
          imports: [SharedModule],
          providers: [
              userServiceProvider,
              userRepositoryProvider,
              postRepositoryProvider,
              followersRepositoryProvider
          ],
        }).compile();
        userService = app.get<IUserService>(IUserService);
        userRepository = app.get<IUserRepository>(IUserRepository);
        postRepository = app.get<IPostRepository>(IPostRepository);
        followersRepository = app.get<IFollowersRepository>(IFollowersRepository);
    });

    it('createPost should not throw error when valid post is created', async () => {
        const createPostDto = {
            userId: "some id",
            text: "Some valid test."
        }
        const post: Post = {
            id: "some id",
            text: createPostDto.text,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        jest.spyOn(postRepository, 'create').mockImplementation(() => Promise.resolve(post));
        await userService.createPost(createPostDto);
    })

    it('createPost should throw error when first letter is not uppercase', async () => {
        const createPostDto = {
            userId: "some id",
            text: "some valid test."
        }
        const error: any = await getError(async () => await userService.createPost(createPostDto));
        expect(error).toBeInstanceOf(InvalidPostError)
        expect(error.message).toEqual('First letter should be upper case')
    })

    it('createPost should throw error last character is not a point', async () => {
        const createPostDto = {
            userId: "some id",
            text: "Some valid test"
        }
        const error: any = await getError(async () => await userService.createPost(createPostDto));
        expect(error).toBeInstanceOf(InvalidPostError)
        expect(error.message).toEqual('Post should finish with point')
    })

    it('createPost should throw error if id is present in text', async () => {
        const createPostDto = {
            userId: "some id",
            text: "Some valsome idid test."
        }
        const error: any = await getError(async () => await userService.createPost(createPostDto));
        expect(error).toBeInstanceOf(InvalidPostError)
        expect(error.message).toEqual('Post can not include user id')
    })

    it('follow should create a Follower if followed does not reached max followers capacity', async () => {
        const followDto: FollowDto = {
            followerId: "1",
            followedId: "2"
        }
        const fakeFollower = {
            id: "some id",
            follower: {
                id: "some id",
                username: "some username",
                private: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            followed: {
                id: "some id",
                username: "some username",
                private: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const followedUser: User = {
            id: followDto.followedId,
            username: "some username",
            private: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            followers: [
                fakeFollower,fakeFollower,fakeFollower,
            ]
        }
        const follower: Follower = {
            id: "some id",
            follower: {
                id: followDto.followerId,
                username: "some username",
                private: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            followed: followedUser,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        jest.spyOn(userRepository, 'findWithFollowersAndPosts').mockImplementation(() => Promise.resolve(followedUser));
        jest.spyOn(followersRepository, 'create').mockImplementation(() => Promise.resolve(follower));
        const result: Follower = await userService.follow(followDto)
        expect(result.follower.id).toEqual(followDto.followerId);
        expect(result.followed.id).toEqual(followDto.followedId);
    })

    it('follow should throw error if followed has reach max followers capacity', async () => {
        const followDto: FollowDto = {
            followerId: "1",
            followedId: "2"
        }
        const fakeFollower = {
            id: "some id",
            follower: {
                id: "some id",
                username: "some username",
                private: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            followed: {
                id: "some id",
                username: "some username",
                private: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const followedUser: User = {
            id: followDto.followedId,
            username: "some username",
            private: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            followers: [
                fakeFollower,fakeFollower,fakeFollower,fakeFollower
            ]
        }
        const follower: Follower = {
            id: "some id",
            follower: {
                id: followDto.followerId,
                username: "some username",
                private: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            followed: followedUser,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        jest.spyOn(userRepository, 'findWithFollowersAndPosts').mockImplementation(() => Promise.resolve(followedUser));
        jest.spyOn(followersRepository, 'create').mockImplementation(() => Promise.resolve(follower));
        const error: any = await getError(async () => await userService.follow(followDto));
        expect(error).toBeInstanceOf(FollowersLimitError)
        expect(error.message).toEqual('User already reached max followers')
    })

    it('getPost should return posts if user is not private', async () => {
        const getPostsDto: GetPostsDto = {
            userId: "1",
            postsOwnerId: "2"
        }
        const postsOwner = {
            id: getPostsDto.postsOwnerId,
            username: "some username",
            private: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            followers: [],
            posts: []
        }
        jest.spyOn(userRepository, 'findWithFollowersAndPosts').mockImplementation(() => Promise.resolve(postsOwner));
        const result = await userService.getPosts(getPostsDto);
        expect(result).toEqual([]);
    })

    it('getPost should return posts to other user if user is private and other user is follower', async () => {
        const getPostsDto: GetPostsDto = {
            userId: "1",
            postsOwnerId: "2"
        }
        const postsOwner: User = {
            id: getPostsDto.postsOwnerId,
            username: "some username",
            private: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            followers: [
                {
                    id: "some id",
                    follower: {
                        id: getPostsDto.userId,
                        username: "some username",
                        private: false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            posts: []
        }
        jest.spyOn(userRepository, 'findWithFollowersAndPosts').mockImplementation(() => Promise.resolve(postsOwner));
        const result = await userService.getPosts(getPostsDto);
        expect(result).toEqual([]);
    })

    it('getPost should throw error if user is private and other user is not follower', async () => {
        const getPostsDto: GetPostsDto = {
            userId: "1",
            postsOwnerId: "2"
        }
        const postsOwner: User = {
            id: getPostsDto.postsOwnerId,
            username: "some username",
            private: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            followers: [
                {
                    id: "some id",
                    follower: {
                        id: "some other id",
                        username: "some username",
                        private: false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            posts: []
        }
        jest.spyOn(userRepository, 'findWithFollowersAndPosts').mockImplementation(() => Promise.resolve(postsOwner));
        const error: any = await getError(async () => await userService.getPosts(getPostsDto));
        expect(error).toBeInstanceOf(NotAuthorizedError)
        expect(error.message).toEqual('User not authorized')
    })

    it('getPost should return posts if user is asking for its own posts', async () => {
        const getPostsDto: GetPostsDto = {
            userId: "1",
            postsOwnerId: "1"
        }
        const postsOwner: User = {
            id: getPostsDto.postsOwnerId,
            username: "some username",
            private: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            followers: [],
            posts: []
        }
        jest.spyOn(userRepository, 'findWithFollowersAndPosts').mockImplementation(() => Promise.resolve(postsOwner));
        const result = await userService.getPosts(getPostsDto);
        expect(result).toEqual([]);
    })

});

const getError = async <TError>(call: () => unknown): Promise<TError> => {
    try {
      await call();
  
      throw new Error();
    } catch (error: unknown) {
      return error as TError;
    }

};