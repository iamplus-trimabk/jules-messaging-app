import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  @HttpCode(HttpStatus.OK)
  async requestOtp(@Body() requestOtpDto: RequestOtpDto): Promise<{ message: string, otp?: string }> {
    const result = await this.authService.requestOtp(requestOtpDto.mobileNumber);
    const response: { message: string, otp?: string } = { message: 'OTP has been sent.' };
    if (result.otp) {
        response.otp = result.otp;
    }
    return response;
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<AuthResponseDto> {
    return this.authService.verifyOtp(verifyOtpDto.mobileNumber, verifyOtpDto.otp);
  }
}
