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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnosController = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const clientes_service_1 = require("../clientes/clientes.service");
const servicios_service_1 = require("../servicios/servicios.service");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const create_turno_dto_1 = require("./dto/create-turno.dto");
const update_turno_dto_1 = require("./dto/update-turno.dto");
const turnos_service_1 = require("./turnos.service");
let TurnosController = class TurnosController {
    constructor(turnosService, clientes, usuarios, servicio) {
        this.turnosService = turnosService;
        this.clientes = clientes;
        this.usuarios = usuarios;
        this.servicio = servicio;
    }
    async findAll(success, borrar, actualizar, realizado) {
        const turnos = (await this.turnosService.findAll()).map((turno) => {
            return {
                ...turno,
                fecha: turno.fecha
                    .toISOString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-"),
                hora: turno.hora
                    .toISOString()
                    .split("T")[1]
                    .split(":")
                    .slice(0, 2)
                    .join(":"),
            };
        });
        const usuarios = await this.usuarios.findAll();
        const clientes = await this.clientes.findAll();
        const servicios = await this.servicio.findAll();
        return {
            turnos,
            clientes,
            usuarios,
            servicios,
            borrar,
            success,
            actualizar,
            realizado,
        };
    }
    async findOne(id) {
        const turnos = (await this.turnosService.findAll()).map((turno) => {
            return {
                ...turno,
                fecha: new Date(turno.fecha)
                    .toISOString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-"),
                hora: turno.hora
                    .toISOString()
                    .split("T")[1]
                    .split(":")
                    .slice(0, 2)
                    .join(":"),
            };
        });
        const turno = await this.turnosService.findOne(id).then((turno) => {
            return {
                ...turno,
                fecha: new Date(turno.fecha).toISOString().split("T")[0],
                hora: turno.hora
                    .toISOString()
                    .split("T")[1]
                    .split(":")
                    .slice(0, 2)
                    .join(":"),
            };
        });
        const serviciosSelected = await this.turnosService.getSelectedServicesByTurno(id);
        const usuarios = await this.usuarios.findAll();
        const clientes = await this.clientes.findAll();
        const servicios = await this.servicio.findAll();
        const edit = true;
        console.log(`Turno ${id} editado, redirigiendo a pagina principal ${edit}`);
        return {
            turnos,
            turno,
            usuarios,
            clientes,
            servicios,
            edit,
            serviciosSelected,
        };
    }
    async showDetails(id) {
        const turno = await this.turnosService
            .findTurnoByClienteId(id)
            .then((turno) => {
            return {
                ...turno,
                fecha: (0, date_fns_1.format)(turno.fecha, "dd-MM-yyyy"),
                hora: (0, date_fns_1.format)(turno.hora, "HH:mm a"),
            };
        });
        return {
            turno,
        };
    }
    async acceptTurno(id) {
        return this.turnosService.acceptTurno(id);
    }
    async create(createTurnoDto) {
        console.log(createTurnoDto.hora);
        console.log(typeof createTurnoDto.hora);
        return this.turnosService.create(createTurnoDto);
    }
    async update(id, updateTurnoDto) {
        return this.turnosService.update(id, updateTurnoDto);
    }
    remove(id) {
        return this.turnosService.remove(id);
    }
};
exports.TurnosController = TurnosController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)("turnos"),
    __param(0, (0, common_1.Query)("success")),
    __param(1, (0, common_1.Query)("borrar")),
    __param(2, (0, common_1.Query)("actualizar")),
    __param(3, (0, common_1.Query)("realizado")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], TurnosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("edit/turno/:id"),
    (0, common_1.Render)("turnos"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TurnosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("details/turno/:id"),
    (0, common_1.Render)("detalleTurno"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TurnosController.prototype, "showDetails", null);
__decorate([
    (0, common_1.Get)("accept/turno/:id"),
    (0, common_1.Redirect)("/?realizado=true"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TurnosController.prototype, "acceptTurno", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.Redirect)("/?success=true"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_turno_dto_1.CreateTurnoDto]),
    __metadata("design:returntype", Promise)
], TurnosController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update/turno/:id"),
    (0, common_1.Redirect)("/?actualizar=true"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_turno_dto_1.UpdateTurnoDto]),
    __metadata("design:returntype", Promise)
], TurnosController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("/delete/turno/:id"),
    (0, common_1.Redirect)("/?borrar=true"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TurnosController.prototype, "remove", null);
exports.TurnosController = TurnosController = __decorate([
    (0, common_1.Controller)("/"),
    __metadata("design:paramtypes", [turnos_service_1.TurnosService,
        clientes_service_1.ClientesService,
        usuarios_service_1.UsuariosService,
        servicios_service_1.ServiciosService])
], TurnosController);
//# sourceMappingURL=turnos.controller.js.map