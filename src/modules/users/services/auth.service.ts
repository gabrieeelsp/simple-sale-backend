import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { JwtService } from "@nestjs/jwt";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/request/create-user.dto";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signup(userDto: CreateUserDto) {
    const users = await this.usersService.findByEmail(userDto.email);
    if (users.length) throw new BadRequestException('Email in use');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(userDto.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create({ ...userDto, password: result });

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) throw new UnauthorizedException();

    const token = await this.generateToken(user);

    return {
      user,
      access_token: token,
    };
  }

  async generateToken(user: User) {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}