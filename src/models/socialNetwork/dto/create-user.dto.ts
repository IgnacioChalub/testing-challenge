import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  private: boolean;
}
