import { CreateServicioDto } from "./dto/create-servicio.dto";
import { UpdateServicioDto } from "./dto/update-servicio.dto";
import { ServiciosService } from "./servicios.service";
export declare class ServiciosController {
    private readonly serviciosService;
    constructor(serviciosService: ServiciosService);
    findAll(success: boolean, borrar: boolean, actualizar: boolean): Promise<{
        servicios: {
            nombre: string;
            activo: boolean | null;
            id: number;
            precio: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        }[];
        borrar: boolean;
        success: boolean;
        actualizar: boolean;
    }>;
    create(createServicioDto: CreateServicioDto): Promise<{
        servicio: {
            nombre: string;
            activo: boolean | null;
            id: number;
            precio: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        };
        edit: boolean;
    }>;
    edit(id: string): Promise<{
        servicio: {
            nombre: string;
            activo: boolean | null;
            id: number;
            precio: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        };
        servicios: {
            nombre: string;
            activo: boolean | null;
            id: number;
            precio: number;
            baja_motivo: string | null;
            baja_fecha: Date | null;
        }[];
        edit: boolean;
    }>;
    update(id: string, updateServicioDto: UpdateServicioDto): Promise<void>;
    remove(id: string): void;
}
