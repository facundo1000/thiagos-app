import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosService } from './servicios.service';
import { ConnectorService } from 'src/connector/connector.service';

const mockServicio = {
  id: 'uuid-s1',
  nombre: 'Corte de pelo',
  descripcion: 'Corte clasico',
  precio: 2500,
  duracion: 30,
  activo: true,
};

const mockRepo = {
  servicio: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('ServiciosService', () => {
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('returns all services', async () => {
      mockRepo.servicio.findMany.mockResolvedValue([mockServicio]);
      const result = await service.findAll();
      expect(result).toEqual([mockServicio]);
    });
  });

  describe('findOne', () => {
    it('returns service by id', async () => {
      mockRepo.servicio.findUnique.mockResolvedValue(mockServicio);
      const result = await service.findOne('uuid-s1');
      expect(result).toEqual(mockServicio);
    });
  });

  describe('create', () => {
    it('parses precio and sets activo=true', async () => {
      mockRepo.servicio.create.mockResolvedValue(mockServicio);
      await service.create({ nombre: 'Corte', precio: 2500, activo: false });
      expect(mockRepo.servicio.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ precio: 2500, activo: true }),
      });
    });
  });

  describe('remove', () => {
    it('soft-deletes service', async () => {
      mockRepo.servicio.update.mockResolvedValue(mockServicio);
      await service.remove('uuid-s1');
      expect(mockRepo.servicio.update).toHaveBeenCalledWith({
        where: { id: 'uuid-s1' },
        data: { activo: false },
      });
    });
  });
});
