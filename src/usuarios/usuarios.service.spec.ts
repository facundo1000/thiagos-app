/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { UsuariosService } from "./usuarios.service";
import { ConnectorService } from "src/connector/connector.service";

const mockRepo = {
  usuario: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe("UsuariosService", () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        { provide: ConnectorService, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("returns all users", async () => {
      const users = [{ id: 1, nombre: "Juan" }];
      mockRepo.usuario.findMany.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(mockRepo.usuario.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("findOne", () => {
    it("returns user by id", async () => {
      const user = { id: 1, nombre: "Juan" };
      mockRepo.usuario.findUnique.mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(result).toEqual(user);
      expect(mockRepo.usuario.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe("create", () => {
    it("parses dni and telefono to int and sets activo true", async () => {
      const dto = {
        nombre: "Juan",
        apellido: "Perez",
        dni: "12345678",
        telefono: "1155551234",
        email: "juan@test.com",
        direccion: "Av. Test 123",
        ciudad: "Buenos Aires",
        provincia: "BA",
        pais: "Argentina",
        tipo_dni: "DNI" as any,
        activo: false,
      };
      const created = { id: 1, ...dto, dni: 12345678, telefono: 1155551234, activo: true };
      mockRepo.usuario.create.mockResolvedValue(created);

      const result = await service.create(dto);

      expect(mockRepo.usuario.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ dni: 12345678, telefono: 1155551234, activo: true }),
      });
      expect(result).toEqual(created);
    });
  });

  describe("update", () => {
    it("parses dni and telefono to number and updates user", async () => {
      const dto = { dni: "99999999", telefono: "1100000000" } as any;
      const updated = { id: 5, dni: 99999999, telefono: 1100000000 };
      mockRepo.usuario.update.mockResolvedValue(updated);

      await service.update(5, dto);

      expect(mockRepo.usuario.update).toHaveBeenCalledWith({
        where: { id: 5 },
        data: expect.objectContaining({ dni: 99999999, telefono: 1100000000 }),
      });
    });
  });

  describe("remove", () => {
    it("sets activo to false (soft delete)", async () => {
      mockRepo.usuario.update.mockResolvedValue({ id: 3, activo: false });

      await service.remove(3);

      expect(mockRepo.usuario.update).toHaveBeenCalledWith({
        where: { id: 3 },
        data: { activo: false },
      });
    });
  });
});
