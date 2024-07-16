/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TurnosService } from "./turnos.service";
import { TurnosController } from "./turnos.controller";
import { ConnectorModule } from "src/connector/connector.module";
import { ClientesService } from "src/clientes/clientes.service";

@Module({
  controllers: [TurnosController],
  providers: [TurnosService, ClientesService],
  imports: [ConnectorModule],
})
export class TurnosModule {}
