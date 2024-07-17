/* eslint-disable prettier/prettier */
import { TIPO_DNI } from "@prisma/client";

/* eslint-disable prettier/prettier */
export class CreateClienteDto {
  nombre: string;
  apellido: string;
  tipo_dni: TIPO_DNI;
  dni: string;
  email: string;
  telefono: string;
  activo: boolean;
}
