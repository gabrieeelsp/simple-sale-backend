import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

  @IsString()
  name: string;

  @IsString()
  surname: string;
  
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}