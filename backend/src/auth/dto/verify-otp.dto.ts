import { IsNotEmpty, IsString, IsPhoneNumber, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  otp: string;
}
