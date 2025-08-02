import { Expose, Type } from 'class-transformer';
import { IvaAliquotDto } from './iva-aliquot.dto';
import { VariantDto } from './variant.dto';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  cost: number;

  @Expose()
  @Type(() => IvaAliquotDto)
  ivaAliquot: IvaAliquotDto;

  @Expose()
  @Type(() => VariantDto)
  variants: VariantDto[];
}
