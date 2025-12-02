import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserDto } from '../users/dto/user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async requestOtp(mobileNumber: string): Promise<{ otp?: string }> {
    let user = await this.usersService.findByMobileNumber(mobileNumber);
    if (!user) {
      user = await this.usersService.create(mobileNumber);
    }

    const otp = crypto.randomInt(1000, 10000).toString();

    const salt = await bcrypt.genSalt();
    const hashedOtp = await bcrypt.hash(otp, salt);
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this.usersService.setOtp(user.id, hashedOtp, otpExpiresAt);

    return {};
  }

  async verifyOtp(mobileNumber: string, otp: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findByMobileNumber(mobileNumber);

    if (!user || !user.otp || new Date() > user.otpExpiresAt) {
      throw new UnauthorizedException('Invalid or expired OTP.');
    }

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      throw new UnauthorizedException('Invalid or expired OTP.');
    }

    // Clear the OTP from the database after successful verification
    await this.usersService.setOtp(user.id, null, null);

    const payload = { sub: user.id, mobileNumber: user.mobileNumber };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: new UserDto(user),
    };
  }
}
