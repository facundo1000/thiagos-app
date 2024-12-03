"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnosService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const connector_service_1 = require("../connector/connector.service");
let TurnosService = class TurnosService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        return this.repo.turno.findMany({
            orderBy: { estado: "asc" },
            include: {
                cliente: true,
                usuario: true,
                TurnoServicio: { include: { servicio: true } },
            },
        });
    }
    async create(createTurnoDto) {
        console.log(createTurnoDto);
        this.repo.turno
            .create({
            data: {
                fecha: new Date(createTurnoDto.fecha),
                hora: new Date(Date.UTC(0, 0, 0, +createTurnoDto.hora.split(":")[0], +createTurnoDto.hora.split(":")[1])),
                activo: true,
                estado: client_1.TURNO_ESTADOS.PENDIENTE,
                cliente: {
                    connect: { id: createTurnoDto.cliente },
                },
                usuario: {
                    connect: { id: createTurnoDto.usuario },
                },
                TurnoServicio: {
                    create: createTurnoDto.servicios.length > 1
                        ? createTurnoDto.servicios.map((servicio) => ({
                            servicio: { connect: { id: servicio } },
                            activo: true,
                        }))
                        : {
                            servicio: { connect: { id: createTurnoDto.servicios[0] } },
                            activo: true,
                        },
                },
            },
        })
            .catch((e) => {
            console.error(e);
        });
    }
    async acceptTurno(id) {
        return this.repo.turno.update({
            where: { id },
            data: {
                estado: client_1.TURNO_ESTADOS.REALIZADO,
                activo: false,
                TurnoServicio: {
                    updateMany: { where: { turno_id: id }, data: { activo: true } },
                },
            },
        });
    }
    findOne(id) {
        return this.repo.turno.findUnique({
            where: { id },
            include: { TurnoServicio: { include: { servicio: true } } },
        });
    }
    async getSelectedServicesByTurno(id) {
        const turno = await this.findOne(id);
        return turno.TurnoServicio.map((turnoServicio) => turnoServicio.servicio_id);
    }
    async findTurnoByClienteId(id) {
        return this.repo.turno.findUnique({
            where: { id: id },
            include: { cliente: true, usuario: true, TurnoServicio: true },
        });
    }
    async update(id, updateTurnoDto) {
        this.repo.turno
            .update({
            where: { id },
            data: {
                fecha: new Date(updateTurnoDto.fecha),
                hora: new Date(Date.UTC(0, 0, 0, +updateTurnoDto.hora.split(":")[0], +updateTurnoDto.hora.split(":")[1])),
                estado: updateTurnoDto.estado,
                cliente: {
                    connect: { id: updateTurnoDto.cliente },
                },
                usuario: {
                    connect: { id: updateTurnoDto.usuario },
                },
                TurnoServicio: {
                    deleteMany: { turno_id: id },
                    create: updateTurnoDto.servicios.length > 1
                        ? updateTurnoDto.servicios.map((servicio) => ({
                            servicio: { connect: { id: servicio } },
                            activo: true,
                        }))
                        : {
                            servicio: { connect: { id: updateTurnoDto.servicios[0] } },
                            activo: true,
                        },
                },
            },
        })
            .catch((e) => {
            console.error(e);
        });
    }
    async findServiciosByTurno() {
        return this.repo.turno.findMany({
            include: { TurnoServicio: true },
        });
    }
    async remove(id) {
        const turno = this.repo.turno.update({
            where: { id },
            data: {
                activo: false,
                estado: client_1.TURNO_ESTADOS.CANCELADO,
                TurnoServicio: {
                    updateMany: { where: { turno_id: id }, data: { activo: false } },
                },
            },
        });
        console.log(`Turno ${(await turno).id} eliminado`);
    }
};
exports.TurnosService = TurnosService;
exports.TurnosService = TurnosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [connector_service_1.ConnectorService])
], TurnosService);
//# sourceMappingURL=turnos.service.js.map