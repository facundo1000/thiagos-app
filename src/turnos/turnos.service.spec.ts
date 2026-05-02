import { Test, TestingModule } from '@nestjs/testing';
import { TurnosService } from './turnos.service';
import { ConnectorService } from 'src/connector/connector.service';
import { TURNO_ESTADOS } from '@prisma/client';

const mockTurno = {
  id: 'uuid-t1',
  fecha: new Date('2025-01-15'),
  hora: new Date('1900-01-01T10:00:00Z'),
  activo: true,
  estado: TURNO_ESTADOS.PENDIENTE,
  cliente_id: 'uuid-c1',
  usuario_id: 'uuid-u1',
  TurnoServicio: [{ servicio_id: 'uuid-s1' }],
};

const mockRepo = {
  turno: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('TurnosService', () => {
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('returns turnos ordered by estado with relations', async () => {
      mockRepo.turno.findMany.mockResolvedValue([mockTurno]);
      const result = await service.findAll();
      expect(result).toEqual([mockTurno]);
      expect(mockRepo.turno.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: { estado: 'asc' } }),
      );
    });
  });

  describe('create', () => {
    it('awaits create and parses fecha/hora correctly', async () => {
      mockRepo.turno.create.mockResolvedValue(mockTurno);
      const dto = {
        fecha: '2025-01-15',
        hora: '10:30',
        usuario: 'uuid-u1',
        cliente: 'uuid-c1',
        activo: true,
        estado: TURNO_ESTADOS.PENDIENTE,
        servicios: ['uuid-s1'],
      };
      await service.create(dto);
      expect(mockRepo.turno.create).toHaveBeenCalledTimes(1);
      const callArgs = mockRepo.turno.create.mock.calls[0][0];
      expect(callArgs.data.fecha).toBeInstanceOf(Date);
      expect(callArgs.data.hora).toBeInstanceOf(Date);
    });
  });

  describe('acceptTurno', () => {
    it('sets estado=REALIZADO and activo=false', async () => {
      mockRepo.turno.update.mockResolvedValue({ ...mockTurno, estado: TURNO_ESTADOS.REALIZADO, activo: false });
      await service.acceptTurno('uuid-t1');
      expect(mockRepo.turno.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'uuid-t1' },
          data: expect.objectContaining({ estado: TURNO_ESTADOS.REALIZADO, activo: false }),
        }),
      );
    });
  });

  describe('remove', () => {
    it('sets estado=CANCELADO and activo=false', async () => {
      mockRepo.turno.update.mockResolvedValue(mockTurno);
      await service.remove('uuid-t1');
      expect(mockRepo.turno.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'uuid-t1' },
          data: expect.objectContaining({ estado: TURNO_ESTADOS.CANCELADO, activo: false }),
        }),
      );
    });
  });

  describe('getSelectedServicesByTurno', () => {
    it('returns servicio_ids for a turno', async () => {
      mockRepo.turno.findUnique.mockResolvedValue(mockTurno);
      const result = await service.getSelectedServicesByTurno('uuid-t1');
      expect(result).toEqual(['uuid-s1']);
    });
  });
});
