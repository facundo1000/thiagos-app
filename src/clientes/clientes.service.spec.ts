import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { ConnectorService } from 'src/connector/connector.service';
import { TIPO_DNI } from '@prisma/client';

const mockCliente = {
  id: 'uuid-c1',
  nombre: 'Martin',
  apellido: 'Lopez',
  dni: 22334455,
  telefono: 1155667788,
  email: 'martin@test.com',
  tipo_dni: TIPO_DNI.DNI,
  activo: true,
};

const mockRepo = {
  cliente: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('ClientesService', () => {
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('returns all clients', async () => {
      mockRepo.cliente.findMany.mockResolvedValue([mockCliente]);
      const result = await service.findAll();
      expect(result).toEqual([mockCliente]);
    });
  });

  describe('findOne', () => {
    it('returns client by id', async () => {
      mockRepo.cliente.findUnique.mockResolvedValue(mockCliente);
      const result = await service.findOne('uuid-c1');
      expect(result).toEqual(mockCliente);
    });
  });

  describe('findByDni', () => {
    it('queries by dni', async () => {
      mockRepo.cliente.findUnique.mockResolvedValue(mockCliente);
      await service.findByDni(22334455);
      expect(mockRepo.cliente.findUnique).toHaveBeenCalledWith({ where: { dni: 22334455 } });
    });
  });

  describe('create', () => {
    it('parses string fields and sets activo=true', async () => {
      mockRepo.cliente.create.mockResolvedValue(mockCliente);
      const dto = {
        nombre: 'Martin',
        apellido: 'Lopez',
        dni: '22334455',
        telefono: '1155667788',
        email: 'martin@test.com',
        tipo_dni: TIPO_DNI.DNI,
        activo: false,
      };
      await service.create(dto);
      expect(mockRepo.cliente.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ dni: 22334455, activo: true }),
      });
    });
  });

  describe('remove', () => {
    it('soft-deletes client by setting activo=false', async () => {
      mockRepo.cliente.update.mockResolvedValue(mockCliente);
      await service.remove('uuid-c1');
      expect(mockRepo.cliente.update).toHaveBeenCalledWith({
        where: { id: 'uuid-c1' },
        data: { activo: false },
      });
    });
  });
});
