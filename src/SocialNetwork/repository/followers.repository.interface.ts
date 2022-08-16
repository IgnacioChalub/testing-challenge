import { Follower } from "@models/socialNetwork/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IFollowersRepository extends IBaseRepository<Follower> {
}
