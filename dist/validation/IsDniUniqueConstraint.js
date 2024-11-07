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
exports.IsDniUniqueConstraint = void 0;
exports.IsDniUnique = IsDniUnique;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const clientes_service_1 = require("../clientes/clientes.service");
let IsDniUniqueConstraint = class IsDniUniqueConstraint {
    constructor(clientesService) {
        this.clientesService = clientesService;
    }
    async validate(dni, args) {
        return this.clientesService.findByDni(+dni).then((cliente) => {
            return cliente ? true : false;
        });
    }
    defaultMessage(args) {
        return "DNI $value ya está en uso";
    }
};
exports.IsDniUniqueConstraint = IsDniUniqueConstraint;
exports.IsDniUniqueConstraint = IsDniUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService])
], IsDniUniqueConstraint);
function IsDniUnique(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDniUniqueConstraint,
        });
    };
}
//# sourceMappingURL=IsDniUniqueConstraint.js.map