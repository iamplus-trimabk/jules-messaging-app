import { UserDto } from '../../users/dto/user.dto';
import { MessageStatus } from '../enums/message-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { MessageContentDto } from './create-message.dto';

export class MessageDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => UserDto })
  sender: UserDto;

  @ApiProperty()
  conversationId: string;

  @ApiProperty({ type: () => MessageContentDto })
  content: { text: string };

  @ApiProperty({ enum: MessageStatus })
  status: MessageStatus;

  @ApiProperty()
  createdAt: Date;
}
