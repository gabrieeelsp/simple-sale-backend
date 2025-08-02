import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dtos/responses/user.dto';
import { plainToInstance } from 'class-transformer';
import { ApiPaginatedResponse } from 'src/common/dto/response/api-paginated-response.dto';
import { UpdateUserDto } from '../dtos/request/update-user.dto';
import { UserFilterDto } from '../dtos/request/user-filter.dto';


@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { };

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    const user = this.usersService.update(id, body);

    const userDto = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return userDto;
  }

  @Get()
  async getUsers(@Query() filters: UserFilterDto) {
    const { page, limit, ...criteria } = filters;

    const { data: users, total } = await this.usersService.find(criteria, page, limit);

    const usersDto = plainToInstance(UserDto, users, {
      excludeExtraneousValues: true,
    });

    return new ApiPaginatedResponse(
      usersDto,
      page,
      limit,
      total,
    );
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const product = this.usersService.findOne(id);

    return plainToInstance(UserDto, product, {
      excludeExtraneousValues: true,
    });
  }

}
