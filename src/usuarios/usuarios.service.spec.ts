import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { ConnectorService } from 'src/connector/connector.service';
import { TIPO_DNI } from '@prisma/client';

const mockUsuario = {
  id: 'uuid-1',
  nombre: 'Juan',
  apellido: 'Perez',
  dni: 12345678,
  telefono: 1122334455,
  email: 'juan@test.com',
  direccion: 'Calle 1',
  ciudad: 'Buenos Aires',
  provincia: 'Buenos Aires',
  pais: 'Argentina',
  tipo_dni: TIPO_DNI.DNI,
  activo: true,
};

const mockRepo = {
  usuario: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('UsuariosService', () => {
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('returns all users', async () => {
      mockRepo.usuario.findMany.mockResolvedValue([mockUsuario]);
      const result = await service.findAll();
      expect(result).toEqual([mockUsuario]);
      expect(mockRepo.usuario.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('returns user by id', async () => {
      mockRepo.usuario.findUnique.mockResolvedValue(mockUsuario);
      const result = await service.findOne('uuid-1');
      expect(result).toEqual(mockUsuario);
      expect(mockRepo.usuario.findUnique).toHaveBeenCalledWith({ where: { id: 'uuid-1' } });
    });
  });

  describe('create', () => {
    it('parses string fields and creates user', async () => {
      mockRepo.usuario.create.mockResolvedValue(mockUsuario);
      const dto = {
        nombre: 'Juan',
        apellido: 'Perez',
        dni: '12345678',
        telefono: '1122334455',
        email: 'juan@test.com',
        direccion: 'Calle 1',
        ciudad: 'Buenos Aires',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        tipo_dni: TIPO_DNI.DNI,
        activo: true,
      };
      await service.create(dto);
      expect(mockRepo.usuario.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ dni: 12345678, telefono: 1122334455, activo: true }),
      });
    });
  });

  describe('update', () => {
    it('awaits the update operation', async () => {
      mockRepo.usuario.update.mockResolvedValue(mockUsuario);
      await service.update('uuid-1', { dni: '12345678', telefono: '1122334455' });
      expect(mockRepo.usuario.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: expect.objectContaining({ dni: 12345678 }),
      });
    });
  });

  describe('remove', () => {
    it('soft-deletes user by setting activo=false', async () => {
      mockRepo.usuario.update.mockResolvedValue(mockUsuario);
      await service.remove('uuid-1');
      expect(mockRepo.usuario.update).toHaveBeenCalledWith({
        where: { id: 'uuid-1' },
        data: { activo: false },
      });
    });
  });
});
