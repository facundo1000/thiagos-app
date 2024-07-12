/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ClientesService } from "./clientes.service";
import { ClientesController } from "./clientes.controller";
import { ConnectorModule } from "src/connector/connector.module";

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [ConnectorModule],
})
export class ClientesModule {}
