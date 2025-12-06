import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { ConversationParticipant } from '../conversations/entities/conversation-participant.entity';
import { TaskDto } from './dto/task.dto';
import { plainToClass } from 'class-transformer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(ConversationParticipant)
    private readonly participantRepository: Repository<ConversationParticipant>,
  ) {}

  async create(createTaskDto: {
    messageId: string;
    userId: string;
    title: string;
    description?: string;
    status?: TaskStatus;
  }): Promise<Task> {
    const task = this.taskRepository.create({
      messageId: createTaskDto.messageId,
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status || TaskStatus.TODO,
      createdById: createTaskDto.userId,
    });
    return this.taskRepository.save(task);
  }

  async updateStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    task.status = status;
    return this.taskRepository.save(task);
  }

  async updateDueDate(taskId: string, dueDate: Date): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    task.dueDate = dueDate;
    return this.taskRepository.save(task);
  }

  async assignTask(taskId: string, assigneeId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    task.assignee = { id: assigneeId } as User;
    return this.taskRepository.save(task);
  }

  async findByConversationId(conversationId: string, userId: string): Promise<TaskDto[]> {
    const participant = await this.participantRepository.findOne({
      where: { conversationId, userId },
    });

    if (!participant) {
      throw new ForbiddenException('You are not a member of this conversation.');
    }

    const tasks = await this.taskRepository.find({
      where: { message: { conversationId: conversationId } },
      relations: ['assignee', 'createdBy', 'message'],
    });

    return tasks.map(task => plainToClass(TaskDto, task));
  }
}
