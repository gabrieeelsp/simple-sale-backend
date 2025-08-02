import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @Column({ name: 'must_change_password' })
  mustChangePassword: boolean;
}