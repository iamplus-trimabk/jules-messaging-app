import { UserDto } from '../../users/dto/user.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { MessageDto } from '../../messages/dto/message.dto';

export class TaskDto {
  id: string;
  message: MessageDto;
  assignee?: UserDto;
  status: TaskStatus;
  dueDate?: Date;
}
