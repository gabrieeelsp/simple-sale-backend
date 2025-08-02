import { IsNumber, IsString, Min,  } from 'class-validator';

import { ExistsInDb } from 'src/common/validators/exists-in-db.decorator';
import { IsProductNameUnique } from '../../validators/is-product-name-unique.validator';
import { IvaAliquot } from '../../entities/iva-aliquot.entity';

export class CreateProductDto {
  
  @IsString()
  @IsProductNameUnique({message: 'El nombre del producto ya existe en el catalogo'})
  name: string;

  @IsNumber({}, {message: 'El costo debe ser un número'})
  @Min(0, {message: 'El costo debe ser mayor a cero'})
  cost: number;

  @IsNumber({}, {message: 'Debe seleccionar una alícuota de IVA'})
  @ExistsInDb(IvaAliquot, 'id', { message: 'La alícuota de IVA no existe' })
  ivaAliquotId: number;
}