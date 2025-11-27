import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConversationType } from '../enums/conversation-type.enum';
import { ParticipantDto } from './participant.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: ConversationType })
  @IsEnum(ConversationType)
  type: ConversationType;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiProperty({ type: () => [ParticipantDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[];
}
