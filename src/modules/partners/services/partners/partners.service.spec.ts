import { Test, TestingModule } from '@nestjs/testing';
import { PartnersService } from './partners.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../../entities';
import { CreatePartnerDto, UpdatePartnerDto } from '../../dto';
import { createMock } from '@golevelup/ts-jest';
import { MarketplaceCategory } from '../../../../libs/constants/marketplaceCategory.constants';

describe('PartnersService', () => {
  let service: PartnersService;
  let partnerRepository: Repository<Partner>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnersService,
        {
          provide: getRepositoryToken(Partner),
          useValue: createMock<Repository<Partner>>(),
        },
      ],
    }).compile();

    service = module.get<PartnersService>(PartnersService);
    partnerRepository = module.get<Repository<Partner>>(
      getRepositoryToken(Partner),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of partners', async () => {
      const partners: Partner[] = [
        { id: 1, name: 'Partner 1', categories: [] },
        { id: 2, name: 'Partner 2', categories: [] },
      ];
      jest.spyOn(partnerRepository, 'find').mockResolvedValue(partners);

      const result = await service.findAll();

      expect(result).toEqual(partners);
    });
  });

  describe('findOne', () => {
    it('should return a partner by id', async () => {
      const partner: Partner = { id: 1, name: 'Partner 1', categories: [] };
      jest.spyOn(partnerRepository, 'findOne').mockResolvedValue(partner);

      const result = await service.findOne(1);

      expect(result).toEqual(partner);
    });

    it('should throw NotFoundException if partner is not found', async () => {
      jest.spyOn(partnerRepository, 'countBy').mockResolvedValue(0);

      await expect(service.findOne(1)).rejects.toThrowError(
        'Partner not found',
      );
    });
  });

  describe('create', () => {
    it('should create a new partner', async () => {
      const createPartnerDto: CreatePartnerDto = {
        name: 'New Partner',
        categories: [MarketplaceCategory.DIGITAL_SOLUTIONS, MarketplaceCategory.EDUCATION_TRAINING],
      };
      const partner: Partner = {
        id: 1,
        name: 'New Partner',
        categories: [],
      };
      jest.spyOn(partnerRepository, 'create').mockReturnValue(partner);
      jest.spyOn(partnerRepository, 'save').mockResolvedValue(partner);

      const result = await service.create(createPartnerDto);

      expect(result).toEqual(partner);
    });
  });

  describe('update', () => {
    it('should update a partner', async () => {
      const updatePartnerDto: UpdatePartnerDto = {
        name: 'Updated Partner',
        categories: [MarketplaceCategory.DIGITAL_SOLUTIONS, MarketplaceCategory.EDUCATION_TRAINING],
      };
      const partner: Partner = {
        id: 1,
        name: 'Partner 1',
        categories: [],
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(partner);
      jest.spyOn(partnerRepository, 'save').mockResolvedValue(partner);

      const result = await service.update(1, updatePartnerDto);

      expect(result).toEqual(partner);
    });

    it('should throw NotFoundException if partner is not found', async () => {
      jest.spyOn(partnerRepository, 'countBy').mockResolvedValue(0);

      await expect(service.update(1, {})).rejects.toThrowError(
        'Partner not found',
      );
    });
  });

  describe('delete', () => {
    it('should delete a partner', async () => {
      const res = { affected: 1 };
      jest.spyOn(service, 'existsOrThrow').mockResolvedValue(undefined);
      jest.spyOn(partnerRepository, 'delete').mockResolvedValue(res as any);

      await expect(service.delete(1)).resolves.toBeUndefined();
    });

    it('should throw InternalServerErrorException if partner is not deleted', async () => {
      const res = { affected: 0 };
      jest.spyOn(service, 'existsOrThrow').mockResolvedValue(undefined);
      jest.spyOn(partnerRepository, 'delete').mockResolvedValue(res as any);

      await expect(service.delete(1)).rejects.toThrowError(
        'Partner not deleted',
      );
    });

    it('should throw NotFoundException if partner is not found', async () => {
      jest.spyOn(partnerRepository, 'countBy').mockResolvedValue(0);

      await expect(service.delete(1)).rejects.toThrowError('Partner not found');
    });
  });
});
