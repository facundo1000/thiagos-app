/* eslint-disable prettier/prettier */
import { TURNO_ESTADOS } from "@prisma/client";

/* eslint-disable prettier/prettier */
export class CreateTurnoDto {
  fecha: string;
  hora: string;
  usuario: string;
  cliente: string;
  activo: boolean;
  estado: TURNO_ESTADOS;
  servicios: string[];
}
