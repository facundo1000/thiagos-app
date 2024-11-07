import { TIPO_DNI } from "@prisma/client";
export declare class CreateClienteDto {
    nombre: string;
    apellido: string;
    tipo_dni: TIPO_DNI;
    dni: string;
    email: string;
    telefono: string;
    activo: boolean;
}
