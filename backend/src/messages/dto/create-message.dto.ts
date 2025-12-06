import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class MessageContentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateMessageDto {
  @ApiProperty()
  @IsUUID()
  conversationId: string;

  @ApiProperty({ required: false, type: () => MessageContentDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MessageContentDto)
  content?: MessageContentDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  app_type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  message_type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  payload?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  parentMessageId?: string;
}
