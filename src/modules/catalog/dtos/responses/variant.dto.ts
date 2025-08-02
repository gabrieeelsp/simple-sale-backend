import { Expose } from "class-transformer";

export class VariantDto {

  @Expose()
  id: number;

  @Expose()
  name: string;
}
