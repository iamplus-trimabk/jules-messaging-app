import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  preload: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const user = { id: 'uuid' };
      mockUserRepository.findOne.mockResolvedValue(user);
      const result = await service.findById('uuid');
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.findById('uuid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProfile', () => {
    it('should update and return a user profile', async () => {
      const user = { id: 'uuid', firstName: 'John' };
      const updateDto = { firstName: 'Jane' };
      mockUserRepository.preload.mockResolvedValue(user);
      mockUserRepository.save.mockResolvedValue({ ...user, ...updateDto });

      const result = await service.updateProfile('uuid', updateDto);

      expect(result.firstName).toBe('Jane');
    });

    it('should throw NotFoundException if user to update is not found', async () => {
        mockUserRepository.preload.mockResolvedValue(null);
        await expect(service.updateProfile('uuid', {})).rejects.toThrow(NotFoundException);
    });
  });
});
