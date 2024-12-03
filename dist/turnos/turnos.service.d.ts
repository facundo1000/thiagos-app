import { Turno } from "@prisma/client";
import { ConnectorService } from "src/connector/connector.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
export declare class TurnosService {
    private repo;
    constructor(repo: ConnectorService);
    findAll(): Promise<Turno[]>;
    create(createTurnoDto: CreateTurnoDto): Promise<void>;
    acceptTurno(id: number): Promise<Turno>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__TurnoClient<{
        activo: boolean | null;
        id: number;
        fecha: Date;
        hora: Date;
        estado: string;
        usuario_id: number;
        cliente_id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findTurnoByClienteId(id: number): Promise<Turno>;
    update(id: number, updateTurnoDto: UpdateTurnoDto): Promise<void>;
    findServiciosByTurno(): Promise<({
        TurnoServicio: {
            activo: boolean | null;
            servicio_id: number;
            turno_id: number;
        }[];
    } & {
        activo: boolean | null;
        id: number;
        fecha: Date;
        hora: Date;
        estado: string;
        usuario_id: number;
        cliente_id: number;
    })[]>;
    remove(id: number): Promise<void>;
}
