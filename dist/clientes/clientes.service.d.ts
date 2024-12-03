import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { ConnectorService } from "src/connector/connector.service";
import { Cliente } from "@prisma/client";
export declare class ClientesService {
    private repo;
    constructor(repo: ConnectorService);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    findByDni(dni: number): Promise<Cliente>;
    create(createClienteDto: CreateClienteDto): Promise<{
        nombre: string;
        apellido: string;
        tipo_dni: import("@prisma/client").$Enums.TIPO_DNI | null;
        dni: number;
        email: string;
        telefono: bigint;
        activo: boolean | null;
        id: string;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<void>;
    remove(id: string): Promise<void>;
}
