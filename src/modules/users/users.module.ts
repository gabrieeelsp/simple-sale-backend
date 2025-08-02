import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './controllers/users.controller';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secreto',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
  ],
  providers: [
    UsersService,
    AuthService,

    AuthGuard,
  ],
  exports: [
    JwtModule,
    AuthGuard,
    UsersService,
  ],
})
export class UsersModule { }