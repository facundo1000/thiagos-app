import { ClientesService } from "./clientes.service";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    findAll(success: boolean, borrar: boolean, actualizar: boolean): Promise<{
        clientes: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
        }[];
        tipos: {
            DNI: "DNI";
            PASAPORTE: "PASAPORTE";
            LC: "LC";
            LE: "LE";
        };
        borrar: boolean;
        success: boolean;
        actualizar: boolean;
    }>;
    create(createClienteDto: CreateClienteDto): Promise<{
        cliente: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
        };
    }>;
    edit(id: string): Promise<{
        cliente: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
        };
        clientes: {
            nombre: string;
            apellido: string;
            tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: string;
        }[];
        tipos: {
            DNI: "DNI";
            PASAPORTE: "PASAPORTE";
            LC: "LC";
            LE: "LE";
        };
        edit: boolean;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): void;
    remove(id: string): Promise<void>;
}
