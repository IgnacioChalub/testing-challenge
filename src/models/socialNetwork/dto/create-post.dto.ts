import { IsNotEmpty, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    userId: string;
    
    @MaxLength(240)
    @IsNotEmpty()
    text: string;
}
  