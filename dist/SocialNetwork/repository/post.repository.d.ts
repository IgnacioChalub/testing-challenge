import { Post } from "@models/socialNetwork/entities";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IPostRepository } from "./post.repository.interface";
export declare class PostRepository extends BaseRepository<Post> implements IPostRepository {
    constructor(db: DatabaseService);
    getPosts(userId: string): Promise<Post[]>;
}
