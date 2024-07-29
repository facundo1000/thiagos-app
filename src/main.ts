/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as hbs from "hbs";
import { join } from "path";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useLogger(app.get(Logger)); //logging adecuado para producción
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");

  hbs.registerPartials(join(__dirname, "..", "views", "partials"));

  // Helper para comparar valores y devolver un booleano true o false
  //Utilizado para comparar si un valores de los selectores que devuelven un unico valor
  hbs.registerHelper("eq", function (a, b): boolean {
    return a === b;
  });

  // Helper para comparar valores dentro de un array y devolver un booleano true o false
  hbs.registerHelper("isInArray", function (value, array): boolean {
    return array.includes(value);
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
