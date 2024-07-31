/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConnectorModule } from "src/connector/connector.module";
import { ServiciosController } from "./servicios.controller";
import { ServiciosService } from "./servicios.service";

@Module({
  controllers: [ServiciosController],
  providers: [ServiciosService],
  imports: [ConnectorModule],
})
export class ServiciosModule {}
