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
exports.ServiciosController = void 0;
const common_1 = require("@nestjs/common");
const create_servicio_dto_1 = require("./dto/create-servicio.dto");
const update_servicio_dto_1 = require("./dto/update-servicio.dto");
const servicios_service_1 = require("./servicios.service");
let ServiciosController = class ServiciosController {
    constructor(serviciosService) {
        this.serviciosService = serviciosService;
    }
    async findAll(success, borrar, actualizar) {
        const servicios = await this.serviciosService.findAll();
        return { servicios, borrar, success, actualizar };
    }
    async create(createServicioDto) {
        const servicio = await this.serviciosService.create(createServicioDto);
        const edit = false;
        return { servicio, edit };
    }
    async edit(id) {
        const servicio = await this.serviciosService.findOne(id);
        const servicios = await this.serviciosService.findAll();
        const edit = true;
        return { servicio, servicios, edit };
    }
    update(id, updateServicioDto) {
        return this.serviciosService.update(id, updateServicioDto);
    }
    remove(id) {
        this.serviciosService.remove(id);
    }
};
exports.ServiciosController = ServiciosController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)("servicios"),
    __param(0, (0, common_1.Query)("success")),
    __param(1, (0, common_1.Query)("borrar")),
    __param(2, (0, common_1.Query)("actualizar")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.Redirect)("/servicios?success=true"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_servicio_dto_1.CreateServicioDto]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/edit/servicio/:id"),
    (0, common_1.Render)("servicios"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServiciosController.prototype, "edit", null);
__decorate([
    (0, common_1.Post)("/update/servicio/:id"),
    (0, common_1.Redirect)("/servicios?actualizar=true"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_servicio_dto_1.UpdateServicioDto]),
    __metadata("design:returntype", void 0)
], ServiciosController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("/delete/servicio/:id"),
    (0, common_1.Redirect)("/servicios?borrar=true"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiciosController.prototype, "remove", null);
exports.ServiciosController = ServiciosController = __decorate([
    (0, common_1.Controller)("/servicios"),
    __metadata("design:paramtypes", [servicios_service_1.ServiciosService])
], ServiciosController);
//# sourceMappingURL=servicios.controller.js.map