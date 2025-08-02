import { Expose } from "class-transformer";
import { UserRole } from "../../entities/user-role";

export class UserDto {

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  surname: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  mustChangePassword: boolean;
}