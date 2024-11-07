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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const connector_service_1 = require("../connector/connector.service");
let ClientesService = class ClientesService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        return this.repo.cliente.findMany();
    }
    async findOne(id) {
        return this.repo.cliente.findUnique({ where: { id } });
    }
    async findByDni(dni) {
        return this.repo.cliente.findUnique({ where: { dni } });
    }
    async create(createClienteDto) {
        const transformCliente = {
            ...createClienteDto,
            dni: +createClienteDto.dni,
            telefono: +createClienteDto.telefono,
            activo: true,
        };
        return this.repo.cliente.create({ data: transformCliente });
    }
    async update(id, updateClienteDto) {
        const transformCliente = {
            ...updateClienteDto,
            dni: +updateClienteDto.dni,
            telefono: +updateClienteDto.telefono,
        };
        const cliente = this.repo.cliente.update({
            where: { id },
            data: transformCliente,
        });
        console.log(`CLiente ${(await cliente).id} actualizado`);
    }
    async remove(id) {
        const cliente = this.repo.cliente.update({
            where: { id },
            data: { activo: false },
        });
        console.log(`Usuario ${(await cliente).id} eliminado`);
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [connector_service_1.ConnectorService])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map