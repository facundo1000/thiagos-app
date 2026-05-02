/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  precio: number;

  activo: boolean;
}
