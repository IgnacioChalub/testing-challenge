import { CreatePostDto } from "@models/socialNetwork/dto";
import { Post } from "@models/socialNetwork/entities";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IPostRepository } from "./post.repository.interface";

@Injectable()
export class PostRepository
  extends BaseRepository<Post>
  implements IPostRepository
{
  constructor(db: DatabaseService) {
    super(db, "post");
  }

  async getPosts(userId: string): Promise<Post[]> {
    return await this.findMany({
      where: {
        userId: userId
      }
    })
  }

}
