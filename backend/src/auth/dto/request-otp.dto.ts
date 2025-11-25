import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class RequestOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null) // Use null for region-agnostic validation
  mobileNumber: string;
}
