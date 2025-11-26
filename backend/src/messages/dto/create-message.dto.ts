import { IsString, IsNotEmpty, IsUUID, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MessageContentDto {
    @IsString()
    @IsNotEmpty()
    text: string;
}

export class CreateMessageDto {
  @IsUUID()
  conversationId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => MessageContentDto)
  content: MessageContentDto;
}
