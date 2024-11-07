import { CreateServicioDto } from "./dto/create-servicio.dto";
import { UpdateServicioDto } from "./dto/update-servicio.dto";
import { ConnectorService } from "src/connector/connector.service";
import { Servicio } from "@prisma/client";
export declare class ServiciosService {
    private repo;
    constructor(repo: ConnectorService);
    findAll(): Promise<Servicio[]>;
    create(createServicioDto: CreateServicioDto): Promise<Servicio>;
    findOne(id: number): Promise<Servicio>;
    update(id: number, updateServicioDto: UpdateServicioDto): Promise<void>;
    remove(id: number): Promise<void>;
}
