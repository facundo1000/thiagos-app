/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { ServiciosService } from "./servicios.service";
import { ConnectorService } from "src/connector/connector.service";

const mockRepo = {
  servicio: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe("ServiciosService", () => {
  let service: ServiciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiciosService,
        { provide: ConnectorService, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ServiciosService>(ServiciosService);
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("returns all servicios", async () => {
      const servicios = [{ id: 1, nombre: "Corte", precio: 1500 }];
      mockRepo.servicio.findMany.mockResolvedValue(servicios);

      const result = await service.findAll();

      expect(result).toEqual(servicios);
    });
  });

  describe("findOne", () => {
    it("returns servicio by id", async () => {
      const servicio = { id: 1, nombre: "Corte", precio: 1500 };
      mockRepo.servicio.findUnique.mockResolvedValue(servicio);

      const result = await service.findOne(1);

      expect(result).toEqual(servicio);
      expect(mockRepo.servicio.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe("create", () => {
    it("coerces precio to number and sets activo true", async () => {
      const dto = { nombre: "Depilacion", precio: "1800", activo: false };
      const created = { id: 2, nombre: "Depilacion", precio: 1800, activo: true };
      mockRepo.servicio.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(mockRepo.servicio.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ precio: 1800, activo: true }),
      });
      expect(result).toEqual(created);
    });
  });

  describe("update", () => {
    it("coerces precio to number and forces activo true", async () => {
      const dto = { nombre: "Corte", precio: "2000" } as any;
      mockRepo.servicio.update.mockResolvedValue({ id: 1, precio: 2000, activo: true });

      await service.update(1, dto);

      expect(mockRepo.servicio.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({ precio: 2000, activo: true }),
      });
    });
  });

  describe("remove", () => {
    it("sets activo to false (soft delete)", async () => {
      mockRepo.servicio.update.mockResolvedValue({ id: 1, activo: false });

      await service.remove(1);

      expect(mockRepo.servicio.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { activo: false },
      });
    });
  });
});
