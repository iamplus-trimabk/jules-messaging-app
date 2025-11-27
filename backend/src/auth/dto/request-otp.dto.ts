import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDto {
  @ApiProperty({
    description: 'The mobile number to send the OTP to.',
    example: '+15555555555',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null) // Use null for region-agnostic validation
  mobileNumber: string;
}
