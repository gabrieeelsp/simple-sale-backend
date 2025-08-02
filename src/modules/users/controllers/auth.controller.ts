import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { CreateUserDto } from "../dtos/request/create-user.dto";
import { plainToInstance } from "class-transformer";
import { SigninUserDto } from "../dtos/request/signin-user.dto";
import { UserDto } from "../dtos/responses/user.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body);

    const userDto = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return userDto;
  }

  @Post('/signin')
  async signin(@Body() body: SigninUserDto) {
    const { user, access_token } = await this.authService.signin(body.email, body.password);

    const userDto = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      user: userDto,
      access_token,
    }
  }
}
