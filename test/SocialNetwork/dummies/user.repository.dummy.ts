import { User } from "@models/socialNetwork/entities";
import { Injectable } from "@nestjs/common";
import { IUserRepository } from "@SocialNetwork/repository";

@Injectable()
export class DummyUserRepository implements IUserRepository {
    findWithFollowersAndPosts(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    create(data: any): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findMany(query: any): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findOne(query: any): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
}