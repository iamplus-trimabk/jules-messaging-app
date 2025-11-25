import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  profileData: object;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  otp: string;

  @Exclude()
  otpExpiresAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
