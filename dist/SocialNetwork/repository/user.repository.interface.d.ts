import { User } from "@models/socialNetwork/entities";
import { IBaseRepository } from "@shared/repository";
export declare abstract class IUserRepository extends IBaseRepository<User> {
    abstract findWithFollowersAndPosts(id: string): Promise<User>;
}
