/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ServiciosService } from "./servicios.service";
import { ServiciosController } from "./servicios.controller";
import { ConnectorModule } from "src/connector/connector.module";

@Module({
  controllers: [ServiciosController],
  providers: [ServiciosService],
  imports: [ConnectorModule],
})
export class ServiciosModule {}
