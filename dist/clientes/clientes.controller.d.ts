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
            tipo_dni: string | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
        }[];
        tipos: any;
        borrar: boolean;
        success: boolean;
        actualizar: boolean;
    }>;
    create(createClienteDto: CreateClienteDto): Promise<{
        cliente: {
            nombre: string;
            apellido: string;
            tipo_dni: string | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
        };
    }>;
    edit(id: string): Promise<{
        cliente: {
            nombre: string;
            apellido: string;
            tipo_dni: string | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
        };
        clientes: {
            nombre: string;
            apellido: string;
            tipo_dni: string | null;
            dni: number;
            email: string;
            telefono: bigint;
            activo: boolean | null;
            id: number;
        }[];
        tipos: any;
        edit: boolean;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): void;
    remove(id: string): Promise<void>;
}
