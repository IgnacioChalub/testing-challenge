import { Follower } from "@models/socialNetwork/entities";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IFollowersRepository } from "./followers.repository.interface";
export declare class FollowersRepository extends BaseRepository<Follower> implements IFollowersRepository {
    constructor(db: DatabaseService);
}
