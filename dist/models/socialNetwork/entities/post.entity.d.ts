import { User } from "./user.entity";
export declare class Post {
    id: String;
    text: string;
    user?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
