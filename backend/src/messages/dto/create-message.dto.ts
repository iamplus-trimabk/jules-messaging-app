import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class MessageContentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateMessageDto {
  @IsUUID()
  conversationId: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MessageContentDto)
  content?: MessageContentDto;

  @IsOptional()
  @IsString()
  app_type?: string;

  @IsOptional()
  @IsString()
  message_type?: string;

  @IsOptional()
  @IsObject()
  payload?: any;

  @IsOptional()
  @IsUUID()
  parentMessageId?: string;
}
