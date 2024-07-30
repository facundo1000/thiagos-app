/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConnectorModule } from "src/connector/connector.module";
import { ClientesController } from "./clientes.controller";
import { ClientesService } from "./clientes.service";

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  imports: [ConnectorModule],
})
export class ClientesModule {}
