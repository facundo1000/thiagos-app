/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TURNOS_ESTADOS as TURNO_ESTADOS } from "src/utils/TURNOS_ESTADOS";

export class CreateTurnoDto {
  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  hora: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  cliente: string;

  activo: boolean;

  @IsEnum(TURNO_ESTADOS)
  @IsOptional()
  estado: TURNO_ESTADOS;

  // HTML forms send a single string when only one checkbox is checked
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  servicios: string[];
}
