import { TURNO_ESTADOS } from "@prisma/client";
export declare class CreateTurnoDto {
    fecha: string;
    hora: string;
    usuario: string;
    cliente: string;
    activo: boolean;
    estado: TURNO_ESTADOS;
    servicios: string[];
}
