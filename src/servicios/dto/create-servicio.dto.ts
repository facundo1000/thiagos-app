/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumberString()
  precio: string;

  activo: boolean;
}
