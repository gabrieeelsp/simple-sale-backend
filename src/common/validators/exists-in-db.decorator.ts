import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsInDbConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, property = 'id'] = args.constraints;

    const repo = this.dataSource.getRepository(EntityClass);
    const entity = await repo.findOneBy({ [property]: value });
    return !!entity;
  }

  defaultMessage(args: ValidationArguments): string {
    const [EntityClass] = args.constraints;
    const entityName = EntityClass.name;
    return `${entityName} with given ID does not exist`;
  }
}

export function ExistsInDb(
  entity: Function,
  property: string = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, property],
      validator: ExistsInDbConstraint,
    });
  };
}
