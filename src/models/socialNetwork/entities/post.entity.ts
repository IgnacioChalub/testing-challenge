import { User } from "./user.entity";

export class Post {
    id: String;
    text: string;
    user?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}