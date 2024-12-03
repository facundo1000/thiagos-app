import { Turno } from "@prisma/client";
import { ConnectorService } from "src/connector/connector.service";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
export declare class TurnosService {
    private repo;
    constructor(repo: ConnectorService);
    findAll(): Promise<Turno[]>;
    create(createTurnoDto: CreateTurnoDto): Promise<void>;
    acceptTurno(id: string): Promise<Turno>;
    findOne(id: string): Promise<Turno>;
    findTurnoByClienteId(id: string): Promise<Turno>;
    update(id: string, updateTurnoDto: UpdateTurnoDto): Promise<void>;
    findServiciosByTurno(): Promise<({
        TurnoServicio: {
            id: number;
            activo: boolean | null;
            turno_id: string;
            servicio_id: string;
        }[];
    } & {
        id: string;
        fecha: Date;
        hora: Date;
        usuario_id: string;
        cliente_id: string;
        activo: boolean | null;
        estado: import("@prisma/client").$Enums.TURNO_ESTADOS | null;
    })[]>;
    remove(id: string): Promise<void>;
}
