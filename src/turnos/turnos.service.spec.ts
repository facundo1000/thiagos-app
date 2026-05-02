/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { TurnosService } from "./turnos.service";
import { ConnectorService } from "src/connector/connector.service";
import { TURNOS_ESTADOS as TURNO_ESTADOS } from "src/utils/TURNOS_ESTADOS";

const mockRepo = {
  turno: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe("TurnosService", () => {
  let service: TurnosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TurnosService,
        { provide: ConnectorService, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TurnosService>(TurnosService);
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("returns all turnos ordered by estado with relations", async () => {
      const turnos = [{ id: 1, estado: "PENDIENTE" }];
      mockRepo.turno.findMany.mockResolvedValue(turnos);

      const result = await service.findAll();

      expect(result).toEqual(turnos);
      expect(mockRepo.turno.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: { estado: "asc" } })
      );
    });
  });

  describe("findOne", () => {
    it("returns turno by id", () => {
      const turno = { id: 1, estado: "PENDIENTE" };
      mockRepo.turno.findUnique.mockResolvedValue(turno);

      service.findOne(1);

      expect(mockRepo.turno.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe("create", () => {
    it("throws when cliente or usuario id is not a number", async () => {
      const dto = {
        fecha: "2024-08-01",
        hora: "10:30",
        cliente: "abc",
        usuario: "1",
        servicios: ["1"],
        activo: true,
        estado: TURNO_ESTADOS.PENDIENTE,
      };

      await expect(service.create(dto)).rejects.toThrow(
        "El id del cliente y el usuario deben ser un número"
      );
    });

    it("creates turno with single servicio", async () => {
      const dto = {
        fecha: "2024-08-01",
        hora: "10:30",
        cliente: "2",
        usuario: "1",
        servicios: ["3"],
        activo: true,
        estado: TURNO_ESTADOS.PENDIENTE,
      };
      mockRepo.turno.create.mockResolvedValue({ id: 10 });

      await service.create(dto);

      expect(mockRepo.turno.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            estado: TURNO_ESTADOS.PENDIENTE,
            activo: true,
          }),
        })
      );
    });

    it("creates turno with multiple servicios", async () => {
      const dto = {
        fecha: "2024-08-01",
        hora: "10:30",
        cliente: "2",
        usuario: "1",
        servicios: ["3", "4"],
        activo: true,
        estado: TURNO_ESTADOS.PENDIENTE,
      };
      mockRepo.turno.create.mockResolvedValue({ id: 11 });

      await service.create(dto);

      const callArg = mockRepo.turno.create.mock.calls[0][0];
      expect(Array.isArray(callArg.data.TurnoServicio.create)).toBe(true);
      expect(callArg.data.TurnoServicio.create).toHaveLength(2);
    });
  });

  describe("acceptTurno", () => {
    it("sets estado to REALIZADO and activo to false", async () => {
      mockRepo.turno.update.mockResolvedValue({ id: 1, estado: "REALIZADO", activo: false });

      const result = await service.acceptTurno(1);

      expect(mockRepo.turno.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({
          estado: TURNO_ESTADOS.REALIZADO,
          activo: false,
        }),
      });
      expect(result).toEqual({ id: 1, estado: "REALIZADO", activo: false });
    });
  });

  describe("remove", () => {
    it("sets estado to CANCELADO and activo to false", async () => {
      mockRepo.turno.update.mockResolvedValue({ id: 2, estado: "CANCELADO", activo: false });

      await service.remove(2);

      expect(mockRepo.turno.update).toHaveBeenCalledWith({
        where: { id: 2 },
        data: expect.objectContaining({
          estado: TURNO_ESTADOS.CANCELADO,
          activo: false,
        }),
      });
    });
  });
});
