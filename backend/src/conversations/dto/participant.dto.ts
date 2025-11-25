import { IsUUID, IsEnum } from 'class-validator';
import { ParticipantRole } from '../enums/participant-role.enum';

export class ParticipantDto {
  @IsUUID()
  userId: string;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;
}
