import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskDto } from './dto/task.dto';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('conversations/:id/tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiResponse({ status: 200, type: [TaskDto] })
  findAll(
    @Param('id') conversationId: string,
    @Request() req,
  ): Promise<TaskDto[]> {
    return this.tasksService.findByConversationId(conversationId, req.user.userId);
  }
}
