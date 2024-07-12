/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TurnosService } from "./turnos.service";
import { TurnosController } from "./turnos.controller";
import { ConnectorModule } from "src/connector/connector.module";

@Module({
  controllers: [TurnosController],
  providers: [TurnosService],
  imports: [ConnectorModule],
})
export class TurnosModule {}
