// src/validators/is-product-name-unique.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsProductNameUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly productsService: ProductsService) {}

  async validate(name: string, args: ValidationArguments) {
    const dto = args.object as any;
    const id = dto.id;

    const existing = await this.productsService.findByName(name);
   
    if (!existing) return true;

    if (id && existing.id === id) return true;

    return false;
  }

  defaultMessage() {
    return 'The product name "$value" already exists';
  }
}

// Decorador para usar en el DTO
export function IsProductNameUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsProductNameUniqueConstraint,
    });
  };
}
