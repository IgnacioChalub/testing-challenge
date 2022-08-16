import { User } from "@models/socialNetwork/entities";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IUserRepository } from "./user.repository.interface";
export declare class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(db: DatabaseService);
    findWithFollowersAndPosts(id: string): Promise<User>;
}
