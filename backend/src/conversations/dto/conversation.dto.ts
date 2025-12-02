import { ConversationType } from '../enums/conversation-type.enum';
import { ParticipantRole } from '../enums/participant-role.enum';
import { UserDto } from '../../users/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ConversationParticipantDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ParticipantRole })
  role: ParticipantRole;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}

export class ConversationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: ConversationType })
  type: ConversationType;

  @ApiProperty()
  tags: string[];

  @ApiProperty({ type: () => [ConversationParticipantDto] })
  participants: ConversationParticipantDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
