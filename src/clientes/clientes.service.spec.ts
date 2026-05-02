/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { ClientesService } from "./clientes.service";
import { ConnectorService } from "src/connector/connector.service";

const mockRepo = {
  cliente: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe("ClientesService", () => {
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        { provide: ConnectorService, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("returns all clientes", async () => {
      const clientes = [{ id: 1, nombre: "Martin" }];
      mockRepo.cliente.findMany.mockResolvedValue(clientes);

      const result = await service.findAll();

      expect(result).toEqual(clientes);
    });
  });

  describe("findOne", () => {
    it("returns cliente by id", async () => {
      const cliente = { id: 2, nombre: "Ana" };
      mockRepo.cliente.findUnique.mockResolvedValue(cliente);

      const result = await service.findOne(2);

      expect(result).toEqual(cliente);
      expect(mockRepo.cliente.findUnique).toHaveBeenCalledWith({ where: { id: 2 } });
    });
  });

  describe("findByDni", () => {
    it("returns cliente by dni", async () => {
      const cliente = { id: 3, dni: 30123456 };
      mockRepo.cliente.findUnique.mockResolvedValue(cliente);

      const result = await service.findByDni(30123456);

      expect(result).toEqual(cliente);
      expect(mockRepo.cliente.findUnique).toHaveBeenCalledWith({ where: { dni: 30123456 } });
    });
  });

  describe("create", () => {
    it("parses dni and telefono to number and sets activo true", async () => {
      const dto = {
        nombre: "Martin",
        apellido: "Lopez",
        dni: "30123456",
        email: "martin@test.com",
        telefono: "1144445555",
        tipo_dni: "DNI" as any,
        activo: false,
      };
      const created = { id: 1, ...dto, dni: 30123456, telefono: 1144445555, activo: true };
      mockRepo.cliente.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(mockRepo.cliente.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ dni: 30123456, telefono: 1144445555, activo: true }),
      });
      expect(result).toEqual(created);
    });
  });

  describe("update", () => {
    it("parses dni and telefono to number and updates cliente", async () => {
      const dto = { dni: "11111111", telefono: "1122223333" } as any;
      mockRepo.cliente.update.mockResolvedValue({ id: 1, dni: 11111111 });

      await service.update(1, dto);

      expect(mockRepo.cliente.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({ dni: 11111111, telefono: 1122223333 }),
      });
    });
  });

  describe("remove", () => {
    it("sets activo to false (soft delete)", async () => {
      mockRepo.cliente.update.mockResolvedValue({ id: 4, activo: false });

      await service.remove(4);

      expect(mockRepo.cliente.update).toHaveBeenCalledWith({
        where: { id: 4 },
        data: { activo: false },
      });
    });
  });
});
