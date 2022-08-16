import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { DatabaseService } from '@shared/service';
import { sync, teardown } from '../../shared.test.module';
import { UserServiceTestModule } from './module/userService.test.module';

describe('Social network module', () => {
    let app: INestApplication;
 
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [UserServiceTestModule],
      }).compile();
   
      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
      await app.init();
    });
   
    beforeAll(() => {
      sync();
    });
   
    afterAll(async () => {
      await teardown(app.get<DatabaseService>(DatabaseService));
    });

    const openUser = {
        username: "a",
        private: false
    }

    const privateUser = {
        username: "b",
        private: true
    }

    const user1 = {
        username: "1",
        private: true
    }
    const user2 = {
        username: "2",
        private: true
    }
    const user3 = {
        username: "3",
        private: true
    }

    let openUserId: string;
    let privateUserId: string;
    let user1Id: string;
    let user2Id: string;
    let user3Id: string;

    const postValidText = "Some text."

    it('/user (POST) should create users', async () => {
        const firstResponse = await request(app.getHttpServer()).post('/user').send(openUser);
        expect(firstResponse.status).toBe(201);
        expect(firstResponse.body.username).toBe(openUser.username);
        expect(firstResponse.body.private).toBe(openUser.private);
        expect(firstResponse.body.deletedAt).toBe(null);
        openUserId = firstResponse.body.id;

        const secondResponse = await request(app.getHttpServer()).post('/user').send(privateUser);
        expect(secondResponse.status).toBe(201);
        expect(secondResponse.body.username).toBe(privateUser.username);
        expect(secondResponse.body.private).toBe(privateUser.private);
        expect(secondResponse.body.deletedAt).toBe(null);
        privateUserId = secondResponse.body.id;

        user1Id = (await request(app.getHttpServer()).post('/user').send(user1)).body.id;
        user2Id = (await request(app.getHttpServer()).post('/user').send(user2)).body.id;
        user3Id = (await request(app.getHttpServer()).post('/user').send(user3)).body.id;
    });

    it('/user (POST) should throw error if username already exists', async () => {
        const response = await request(app.getHttpServer()).post('/user').send(openUser);
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('user already exists');
    });

    it('/user/create-post (POST) should throw error if post text does not start with uppercase', async () => {
        const postWithoutUppercase = {
            userId: openUserId,
            text: "some text."
        }
        const response = await request(app.getHttpServer()).post('/user/create-post').send(postWithoutUppercase);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('First letter should be upper case');
    });

    it('/user/create-post (POST) should throw error if post text does not finish with point', async () => {
        const postWithoutFinalPoint = {
            userId: openUserId,
            text: "Some text"
        }
        const response = await request(app.getHttpServer()).post('/user/create-post').send(postWithoutFinalPoint);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Post should finish with point');
    });

    it('/user/create-post (POST) should throw error if post contains user id', async () => {
        const postWithUserId = {
            userId: openUserId,
            text: "Some + " + openUserId + "text."
        }
        const response = await request(app.getHttpServer()).post('/user/create-post').send(postWithUserId);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Post can not include user id');
    });

    it('/user/create-post (POST) should throw error if post text contains more than 240 characrters', async () => {
        const postWithMoreThan240Charaters = {
            userId: openUserId,
            text: "some textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome textsome texsome tex"
        }
        const response = await request(app.getHttpServer()).post('/user/create-post').send(postWithMoreThan240Charaters);
        expect(response.status).toBe(400);
        expect(response.body.message[0]).toBe('text must be shorter than or equal to 240 characters');
    });

    it('/user/create-post (POST) should create valid post', async () => {
        const openUservalidPost = {
            userId: openUserId,
            text: postValidText
        }
        const firstResponse = await request(app.getHttpServer()).post('/user/create-post').send(openUservalidPost);
        expect(firstResponse.status).toBe(201);
        expect(firstResponse.body.userId).toBe(openUservalidPost.userId);
        expect(firstResponse.body.text).toBe(openUservalidPost.text);
        expect(firstResponse.body.deletedAt).toBe(null);

        const privateUserValidPost = {
            userId: privateUserId,
            text: postValidText
        }
        const secondResponse = await request(app.getHttpServer()).post('/user/create-post').send(privateUserValidPost);
        expect(secondResponse.status).toBe(201);
        expect(secondResponse.body.userId).toBe(privateUserValidPost.userId);
        expect(secondResponse.body.text).toBe(privateUserValidPost.text);
        expect(secondResponse.body.deletedAt).toBe(null);
    });

    it('/user/posts (POST) should return return posts to its owner', async () => {
        const getPostsReq = {
            userId: privateUserId,
            postsOwnerId: privateUserId
        }
        const response = await request(app.getHttpServer()).get('/user/posts').send(getPostsReq);
        expect(response.status).toBe(200);
        expect(response.body[0].userId).toBe(getPostsReq.postsOwnerId);    
        expect(response.body[0].text).toBe(postValidText);
        expect(response.body[0].deletedAt).toBe(null);
    });

    it('/user/posts (POST) should throw error if post owner is private and user is not follower', async () => {
        const getPostsReq = {
            userId: openUserId,
            postsOwnerId: privateUserId
        }
        const response = await request(app.getHttpServer()).get('/user/posts').send(getPostsReq);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not authorized');    
    });

    it('/user/posts (POST) should return posts of not private user', async () => {
        const getPostsReq = {
            userId: privateUserId,
            postsOwnerId: openUserId
        }
        const response = await request(app.getHttpServer()).get('/user/posts').send(getPostsReq);
        expect(response.status).toBe(200);
        expect(response.body[0].userId).toBe(getPostsReq.postsOwnerId);    
        expect(response.body[0].text).toBe(postValidText);
        expect(response.body[0].deletedAt).toBe(null);
    });

    it('/user/follow (POST) should accept new followers', async () => {
        const followRequest = {
            followerId: openUserId,
            followedId: privateUserId
        }
        const response = await request(app.getHttpServer()).post('/user/follow').send(followRequest);
        expect(response.status).toBe(201);
        expect(response.body.followerId).toBe(followRequest.followerId);
        expect(response.body.followedId).toBe(followRequest.followedId);    
        expect(response.body.deletedAt).toBe(null);
    });

    it('/user/follow (POST) should throw errro ir user is already a follower', async () => {
        const followRequest = {
            followerId: openUserId,
            followedId: privateUserId
        }
        const response = await request(app.getHttpServer()).post('/user/follow').send(followRequest);
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('followers already exists');
    });

    it('/user/follow (POST) should throw errro ir user has reached followers max capacity', async () => { 
        const followRequest = {
            followerId: "some id",
            followedId: privateUserId
        }
        const res1 = await request(app.getHttpServer()).post('/user/follow').send({
            followerId: user1Id,
            followedId: privateUserId
        });
        const res2 = await request(app.getHttpServer()).post('/user/follow').send({
            followerId: user2Id,
            followedId: privateUserId
        });
        const res3 = await request(app.getHttpServer()).post('/user/follow').send({
            followerId: user3Id,
            followedId: privateUserId
        });
        expect(res1.status).toBe(201);
        expect(res2.status).toBe(201);
        expect(res3.status).toBe(201);
        const response = await request(app.getHttpServer()).post('/user/follow').send(followRequest);
        expect(response.status).toBe(400);
    });

});
