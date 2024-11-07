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
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const clientes_service_1 = require("./clientes.service");
const create_cliente_dto_1 = require("./dto/create-cliente.dto");
const update_cliente_dto_1 = require("./dto/update-cliente.dto");
let ClientesController = class ClientesController {
    constructor(clientesService) {
        this.clientesService = clientesService;
    }
    async findAll(success, borrar, actualizar) {
        const clientes = await this.clientesService.findAll();
        const tipos = client_1.TIPO_DNI;
        return { clientes, tipos, borrar, success, actualizar };
    }
    async create(createClienteDto) {
        const cliente = await this.clientesService.create(createClienteDto);
        return { cliente };
    }
    async edit(id) {
        const cliente = await this.clientesService.findOne(+id);
        const clientes = await this.clientesService.findAll();
        const tipos = client_1.TIPO_DNI;
        const edit = true;
        return { cliente, clientes, tipos, edit };
    }
    update(id, updateClienteDto) {
        this.clientesService.update(+id, updateClienteDto);
    }
    async remove(id) {
        this.clientesService.remove(+id);
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)("clientesAbm"),
    __param(0, (0, common_1.Query)("success")),
    __param(1, (0, common_1.Query)("borrar")),
    __param(2, (0, common_1.Query)("actualizar")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.Redirect)("/clientes?success=true"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/edit/cliente/:id"),
    (0, common_1.Render)("clientesAbm"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "edit", null);
__decorate([
    (0, common_1.Post)("/update/cliente/:id"),
    (0, common_1.Redirect)("/clientes?actualizar=true"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("/delete/cliente/:id"),
    (0, common_1.Redirect)("/clientes?borrar=true"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "remove", null);
exports.ClientesController = ClientesController = __decorate([
    (0, common_1.Controller)("/clientes"),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map