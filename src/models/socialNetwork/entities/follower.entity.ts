import { User } from "./user.entity";

export class Follower {
    id: string;
    follower?: User;
    followed?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}