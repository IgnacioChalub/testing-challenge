import { CreatePostDto } from "@models/socialNetwork/dto";
import { Post } from "@models/socialNetwork/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IPostRepository extends IBaseRepository<Post> {
    abstract getPosts(userId: string): Promise<Post[]>;
}
