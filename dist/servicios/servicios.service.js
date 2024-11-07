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
exports.ServiciosService = void 0;
const common_1 = require("@nestjs/common");
const connector_service_1 = require("../connector/connector.service");
let ServiciosService = class ServiciosService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        return this.repo.servicio.findMany();
    }
    async create(createServicioDto) {
        const transformServicio = {
            ...createServicioDto,
            precio: +createServicioDto.precio,
            activo: true,
        };
        return this.repo.servicio.create({ data: transformServicio });
    }
    async findOne(id) {
        return this.repo.servicio.findUnique({ where: { id } });
    }
    async update(id, updateServicioDto) {
        const transformServicio = {
            ...updateServicioDto,
            precio: +updateServicioDto.precio,
            activo: true,
        };
        const servicio = this.repo.servicio.update({
            where: { id },
            data: transformServicio,
        });
        console.log(`Servicio ${(await servicio).id} actualizado`);
    }
    async remove(id) {
        const servicio = this.repo.servicio.update({
            where: { id },
            data: { activo: false },
        });
        console.log(`Servicio ${(await servicio).id} eliminado`);
    }
};
exports.ServiciosService = ServiciosService;
exports.ServiciosService = ServiciosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [connector_service_1.ConnectorService])
], ServiciosService);
//# sourceMappingURL=servicios.service.js.map