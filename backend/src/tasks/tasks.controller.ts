import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskDto } from './dto/task.dto';

@Controller('conversations/:id/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(
    @Param('id') conversationId: string,
    @Request() req,
  ): Promise<TaskDto[]> {
    return this.tasksService.findByConversationId(conversationId, req.user.userId);
  }
}
