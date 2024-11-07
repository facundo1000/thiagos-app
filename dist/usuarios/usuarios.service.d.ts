import { Usuario } from "@prisma/client";
import { ConnectorService } from "src/connector/connector.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
export declare class UsuariosService {
    private repo;
    constructor(repo: ConnectorService);
    findAll(): Promise<Usuario[]>;
    create(userDto: CreateUsuarioDto): Promise<Usuario>;
    findOne(id: number): Promise<Usuario>;
    update(id: number, updateDto: UpdateUsuarioDto): Promise<void>;
    remove(id: number): Promise<void>;
}