"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnosModule = void 0;
const common_1 = require("@nestjs/common");
const turnos_service_1 = require("./turnos.service");
const turnos_controller_1 = require("./turnos.controller");
const connector_module_1 = require("../connector/connector.module");
const clientes_service_1 = require("../clientes/clientes.service");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const servicios_service_1 = require("../servicios/servicios.service");
let TurnosModule = class TurnosModule {
};
exports.TurnosModule = TurnosModule;
exports.TurnosModule = TurnosModule = __decorate([
    (0, common_1.Module)({
        controllers: [turnos_controller_1.TurnosController],
        providers: [
            turnos_service_1.TurnosService,
            clientes_service_1.ClientesService,
            usuarios_service_1.UsuariosService,
            servicios_service_1.ServiciosService,
        ],
        imports: [connector_module_1.ConnectorModule],
    })
], TurnosModule);
//# sourceMappingURL=turnos.module.js.map