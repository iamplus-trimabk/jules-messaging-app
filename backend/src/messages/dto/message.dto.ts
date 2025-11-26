import { UserDto } from '../../users/dto/user.dto';
import { MessageStatus } from '../enums/message-status.enum';

export class MessageDto {
  id: string;
  sender: UserDto;
  conversationId: string;
  content: { text: string };
  status: MessageStatus;
  createdAt: Date;
}
