import { UserDto } from '../../users/dto/user.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { MessageDto } from '../../messages/dto/message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => MessageDto })
  message: MessageDto;

  @ApiProperty({ type: () => UserDto, required: false })
  assignee?: UserDto;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty({ required: false })
  dueDate?: Date;
}
