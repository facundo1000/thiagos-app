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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
const usuarios_service_1 = require("./usuarios.service");
const client_1 = require("@prisma/client");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async findAll(success, borrar, actualizar) {
        const users = await this.usuariosService.findAll();
        const tipos = client_1.TIPO_DNI;
        return { users, tipos, borrar, success, actualizar };
    }
    async create(createUsuarioDto) {
        const edit = false;
        const user = this.usuariosService.create(createUsuarioDto);
        return { user, edit };
    }
    async edit(id) {
        const user = await this.usuariosService.findOne(id);
        const users = await this.usuariosService.findAll();
        const edit = true;
        const tipos = client_1.TIPO_DNI;
        console.log(`usuario ${id} editado, redirigiendo a /usuarios ${edit}`);
        return { user, users, edit, tipos };
    }
    update(id, updateUsuarioDto) {
        return this.usuariosService.update(id, updateUsuarioDto);
    }
    async remove(id) {
        return this.usuariosService.remove(id);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)("usuariosAbm"),
    __param(0, (0, common_1.Query)("success")),
    __param(1, (0, common_1.Query)("borrar")),
    __param(2, (0, common_1.Query)("actualizar")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.Redirect)("/usuarios?success=true"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/edit/user/:id"),
    (0, common_1.Render)("usuariosAbm"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "edit", null);
__decorate([
    (0, common_1.Post)("/update/user/:id"),
    (0, common_1.Redirect)("/usuarios?actualizar=true"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("/delete/user/:id"),
    (0, common_1.Redirect)("/usuarios?borrar=true"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "remove", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)("/usuarios"),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map