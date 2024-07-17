/* eslint-disable prettier/prettier */

import { TIPO_DNI } from "@prisma/client";

/* eslint-disable prettier/prettier */
export class CreateUsuarioDto {
  nombre: string;
  apellido: string;
  dni: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  pais: string;
  telefono: string;
  email: string;
  tipo_dni: TIPO_DNI;
  activo: boolean;
}
