import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ParticipantDto } from './participant.dto';

export class AddParticipantsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];
}
