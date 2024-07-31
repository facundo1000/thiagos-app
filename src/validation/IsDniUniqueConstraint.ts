/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { ClientesService } from "src/clientes/clientes.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDniUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly clientesService: ClientesService) {}

  async validate(dni: string, args: ValidationArguments) {
    return this.clientesService.findByDni(+dni).then((cliente) => {
      return cliente ? true : false;
    });
  }

  defaultMessage(args: ValidationArguments) {
    return "DNI $value ya está en uso";
  }
}

export function IsDniUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDniUniqueConstraint,
    });
  };
}
