import { Post } from "@models/socialNetwork/entities";
import { Injectable } from "@nestjs/common";
import { IPostRepository } from "@SocialNetwork/repository";

@Injectable()
export class DummyPostRepository implements IPostRepository {
    getPosts(userId: string): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    create(data: any): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: String): Promise<Post> {
        throw new Error("Method not implemented.");
    }
    findMany(query: any): Promise<Post[]> {
        throw new Error("Method not implemented.");
    }
    findOne(query: any): Promise<Post> {
        throw new Error("Method not implemented.");
    }
}