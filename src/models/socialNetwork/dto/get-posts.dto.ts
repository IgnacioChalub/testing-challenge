import { IsNotEmpty } from "class-validator";

export class GetPostsDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    postsOwnerId: string;
}
