import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dtos/request/create-user.dto";
import { UserFilterDto } from "../dtos/request/user-filter.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) { }

  create(userDto: CreateUserDto) {
    const user = this.repo.create(userDto);

    return this.repo.save(user);
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, attr);
    try {
      return await this.repo.save(user);
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail || '';

        if (detail.includes('(email)')) throw new ConflictException('Ya existe un usuario con ese email');
        throw new ConflictException('Ya existe un registro con esos datos');
      }

      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async find(filters: Partial<UserFilterDto>, page = 1, limit = 10) {
    const query = this.repo.createQueryBuilder('user');

    if (filters.name)
      query.andWhere('user.name ILIKE :name', { name: filters.name });

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total };
  }

  findByEmail(email: string) {
    return this.repo.findBy({ email })
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}