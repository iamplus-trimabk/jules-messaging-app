import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ParticipantDto } from './participant.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AddParticipantsDto {
  @ApiProperty({ type: () => [ParticipantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];
}
