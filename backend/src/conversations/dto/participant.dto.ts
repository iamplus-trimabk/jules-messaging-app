import { IsUUID, IsEnum } from 'class-validator';
import { ParticipantRole } from '../enums/participant-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ParticipantDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty({ enum: ParticipantRole })
  @IsEnum(ParticipantRole)
  role: ParticipantRole;
}
