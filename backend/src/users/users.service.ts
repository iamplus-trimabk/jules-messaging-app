import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByMobileNumber(mobileNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mobileNumber } });
  }

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return new UserDto(user);
  }

  async create(mobileNumber: string): Promise<User> {
    const user = this.userRepository.create({ mobileNumber });
    return this.userRepository.save(user);
  }

  async setOtp(userId: string, otp: string | null, otpExpiresAt: Date | null): Promise<void> {
    await this.userRepository.update(userId, { otp, otpExpiresAt });
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<UserDto> {
    const user = await this.userRepository.preload({ id, ...updateProfileDto });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const updatedUser = await this.userRepository.save(user);
    return new UserDto(updatedUser);
  }

  async updateSocketId(userId: string, socketId: string | null): Promise<void> {
    await this.userRepository.update(userId, { socketId });
  }
}
