import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationQueryDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El parámetro "page" debe ser un número entero' })
  @Min(1, { message: 'El parámetro "page" debe ser mayor o igual a 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El parámetro "limit" debe ser un número entero' })
  @Min(1, { message: 'El parámetro "limit" debe ser mayor o igual a 1' })
  limit?: number = 10;
}