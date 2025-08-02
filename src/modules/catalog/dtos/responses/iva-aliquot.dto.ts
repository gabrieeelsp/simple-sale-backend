import { Expose } from 'class-transformer';

export class IvaAliquotDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  value: number; // por ejemplo, 21, 10.5, etc.
}
