import { IsBoolean, IsNumber, IsString, Min, } from 'class-validator';
import { IsProductNameUnique } from '../../validators/is-product-name-unique.validator';

export class UpdateProductDto {

  @IsString()
  // @IsProductNameUnique({message: 'El nombre del producto ya existe en el catalogo'})
  name: string;

  @IsNumber()
  @Min(0, { message: 'El costo debe ser mayor a cero' })
  cost: number;

  @IsBoolean()
  isStockUnitarioVariable: boolean;

  @IsNumber()
  stockAproximadoUnidad: number;

  @IsBoolean()
  isEnable: boolean;
}