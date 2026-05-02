/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TIPO_DNI } from "src/utils/TIPO_DNI";

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEnum(TIPO_DNI)
  @IsOptional()
  tipo_dni: TIPO_DNI;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  activo: boolean;
}
