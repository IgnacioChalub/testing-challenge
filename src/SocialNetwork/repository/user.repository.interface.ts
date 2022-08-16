import { User } from "@models/socialNetwork/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IUserRepository extends IBaseRepository<User> {
    abstract findWithFollowersAndPosts(id: string): Promise<User>;
}
