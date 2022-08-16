import { Follower } from "./follower.entity";
import { Post } from "./post.entity";

export class User {
  id: string;
  username: string;
  private: boolean;
  posts?: Post[];
  followers?: Follower[];
  following?: Follower[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
