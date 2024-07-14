/* eslint-disable prettier/prettier */
import { Cliente, Usuario } from "@prisma/client";

/* eslint-disable prettier/prettier */
export class CreateTurnoDto {
  fecha: Date;
  hora: Date;
  usuario: Usuario;
  cliente: Cliente;
  activo: boolean;
}
