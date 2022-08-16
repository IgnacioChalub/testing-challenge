import { Post } from "@models/socialNetwork/entities";
import { IBaseRepository } from "@shared/repository";
export declare abstract class IPostRepository extends IBaseRepository<Post> {
    abstract getPosts(userId: string): Promise<Post[]>;
}
