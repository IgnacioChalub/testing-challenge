import { Follower } from "@models/socialNetwork/entities";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IFollowersRepository } from "./followers.repository.interface";

@Injectable()
export class FollowersRepository
  extends BaseRepository<Follower>
  implements IFollowersRepository
{
  constructor(db: DatabaseService) {
    super(db, "followers");
  }

}