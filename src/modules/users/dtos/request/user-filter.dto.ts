import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "src/common/dto/request/pagination.dto";

export class UserFilterDto extends PaginationQueryDto {

  @IsOptional()
  @IsString()
  name?: string;
}
