import { User } from "@models/socialNetwork/entities";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IUserRepository } from "./user.repository.interface";

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(db: DatabaseService) {
    super(db, "user");
  }

  async findWithFollowersAndPosts(id: string): Promise<User> {
    return await this.findOne({
      where: {
        id: id
      },
      include: {
        followers: {
          include: {
            follower: true,
            followed: true
          }
        },
        posts: true
      }
    })   
  }

}
