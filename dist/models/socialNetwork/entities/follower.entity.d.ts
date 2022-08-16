import { User } from "./user.entity";
export declare class Follower {
    id: string;
    follower?: User;
    followed?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
