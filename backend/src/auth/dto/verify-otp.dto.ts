import { IsNotEmpty, IsString, IsPhoneNumber, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'The mobile number to verify.',
    example: '+15555555555',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  mobileNumber: string;

  @ApiProperty({
    description: 'The 4-digit OTP.',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  otp: string;
}
