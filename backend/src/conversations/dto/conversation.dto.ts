import { ConversationType } from '../enums/conversation-type.enum';
import { ParticipantRole } from '../enums/participant-role.enum';
import { UserDto } from '../../users/dto/user.dto';

export class ConversationParticipantDto {
  id: string;
  role: ParticipantRole;
  user: UserDto;
}

export class ConversationDto {
  id: string;
  title: string;
  type: ConversationType;
  tags: string[];
  participants: ConversationParticipantDto[];
  createdAt: Date;
  updatedAt: Date;
}
