import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import { ConnectorService } from "src/connector/connector.service";
import { Cliente } from "@prisma/client";
export declare class ClientesService {
    private repo;
    constructor(repo: ConnectorService);
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    findByDni(dni: number): Promise<Cliente>;
    create(createClienteDto: CreateClienteDto): Promise<{
        nombre: string;
        apellido: string;
        tipo_dni: string | null;
        dni: number;
        email: string;
        telefono: bigint;
        activo: boolean | null;
        id: number;
    }>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<void>;
    remove(id: number): Promise<void>;
}
