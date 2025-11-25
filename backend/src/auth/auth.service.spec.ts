import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Mock data and services
const mockUsersService = {
  findByMobileNumber: jest.fn(),
  create: jest.fn(),
  setOtp: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('requestOtp', () => {
    it('should create a new user if one does not exist and set OTP', async () => {
      const mobileNumber = '+1234567890';
      const user = { id: 'uuid', mobileNumber };
      mockUsersService.findByMobileNumber.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(user);

      await service.requestOtp(mobileNumber);

      expect(mockUsersService.findByMobileNumber).toHaveBeenCalledWith(mobileNumber);
      expect(mockUsersService.create).toHaveBeenCalledWith(mobileNumber);
      expect(mockUsersService.setOtp).toHaveBeenCalledWith(user.id, expect.any(String), expect.any(Date));
    });
  });

  describe('verifyOtp', () => {
    it('should throw UnauthorizedException for invalid OTP', async () => {
        const mobileNumber = '+1234567890';
        const user = { id: 'uuid', mobileNumber, otp: await bcrypt.hash('wrong-otp', 10), otpExpiresAt: new Date(Date.now() + 10000) };
        mockUsersService.findByMobileNumber.mockResolvedValue(user);

        await expect(service.verifyOtp(mobileNumber, '1234')).rejects.toThrow(UnauthorizedException);
    });

    it('should return accessToken and user on successful verification', async () => {
        const mobileNumber = '+1234567890';
        const otp = '1234';
        const hashedOtp = await bcrypt.hash(otp, 10);
        const user = { id: 'uuid', mobileNumber, otp: hashedOtp, otpExpiresAt: new Date(Date.now() + 10000) };

        mockUsersService.findByMobileNumber.mockResolvedValue(user);
        mockJwtService.sign.mockReturnValue('test-token');

        const result = await service.verifyOtp(mobileNumber, otp);

        expect(result.accessToken).toBe('test-token');
        expect(result.user).toBeDefined();
        expect(mockUsersService.setOtp).toHaveBeenCalledWith(user.id, null, null);
    });
  });
});
