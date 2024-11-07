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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const connector_service_1 = require("../connector/connector.service");
let UsuariosService = class UsuariosService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        return this.repo.usuario.findMany();
    }
    async create(userDto) {
        const transformUser = {
            ...userDto,
            dni: parseInt(userDto.dni),
            telefono: parseInt(userDto.telefono),
            activo: true,
        };
        return this.repo.usuario.create({ data: transformUser });
    }
    async findOne(id) {
        return this.repo.usuario.findUnique({ where: { id } });
    }
    async update(id, updateDto) {
        const updateUser = {
            ...updateDto,
            dni: +updateDto.dni,
            telefono: +updateDto.telefono,
        };
        const userUpdated = this.repo.usuario.update({
            where: { id },
            data: updateUser,
        });
        console.log(`Usuario ${(await userUpdated).id} actualizado`);
    }
    async remove(id) {
        const user = this.repo.usuario.update({
            where: { id },
            data: { activo: false },
        });
        console.log(`Usuario ${(await user).id} eliminado`);
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [connector_service_1.ConnectorService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map