import { Follower } from "@models/socialNetwork/entities";
import { Injectable } from "@nestjs/common";
import { IFollowersRepository } from "@SocialNetwork/repository";

@Injectable()
export class DummyFollowersRepository implements IFollowersRepository {
    create(data: any): Promise<Follower> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Follower[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Follower> {
        throw new Error("Method not implemented.");
    }
    findMany(query: any): Promise<Follower[]> {
        throw new Error("Method not implemented.");
    }
    findOne(query: any): Promise<Follower> {
        throw new Error("Method not implemented.");
    }
    
}