import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConversationType } from '../enums/conversation-type.enum';
import { ParticipantDto } from './participant.dto';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(ConversationType)
  type: ConversationType;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];
}
