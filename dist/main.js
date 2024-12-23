"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const hbs = require("hbs");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
    app.setBaseViewsDir((0, path_1.join)(__dirname, "..", "views"));
    app.setViewEngine("hbs");
    app.useGlobalPipes(new common_1.ValidationPipe());
    hbs.registerPartials((0, path_1.join)(__dirname, "..", "views", "partials"));
    hbs.registerHelper("eq", function (a, b) {
        return a === b;
    });
    hbs.registerHelper("isInArray", function (value, array) {
        return array.includes(value);
    });
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
console.log('Hello from the other side');
//# sourceMappingURL=main.js.map