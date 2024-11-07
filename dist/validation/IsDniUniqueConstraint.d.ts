import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { ClientesService } from "src/clientes/clientes.service";
export declare class IsDniUniqueConstraint implements ValidatorConstraintInterface {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    validate(dni: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsDniUnique(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
