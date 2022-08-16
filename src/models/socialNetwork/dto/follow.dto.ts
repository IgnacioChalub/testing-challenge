import { IsNotEmpty } from "class-validator";

export class FollowDto {

    @IsNotEmpty()
    followerId: string;
    
    @IsNotEmpty()
    followedId: string;

}