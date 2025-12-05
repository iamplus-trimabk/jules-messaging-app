import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { ConversationsService } from '../conversations/conversations.service';
import { UsersService } from '../users/users.service';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageStatus } from './entities/message.entity';

@UseGuards(WsJwtGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessagesGateway');

  constructor(
    private readonly messagesService: MessagesService,
    private readonly conversationsService: ConversationsService,
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = client.handshake['user'];
    this.logger.log(`Client connected: ${client.id} - User: ${user.userId}`);

    await this.usersService.updateSocketId(user.userId, client.id);

    const conversations = await this.conversationsService.findByUserId(user.userId);
    const roomIds = conversations.map(c => c.id);
    client.join(roomIds);
    this.logger.log(`User ${user.userId} joined rooms: ${roomIds.join(', ')}`);
  }

  async handleDisconnect(client: Socket) {
    const user = client.handshake['user'];
    if (user) {
      await this.usersService.updateSocketId(user.userId, null);
    }
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const user = client.handshake['user'];
    const { payload, conversationId, app_type, message_type, parentMessageId } = createMessageDto;

    if (app_type === 'tasks') {
      let task: Task;
      let messageContentText: string;
      let responsePayload: any;

      switch (message_type) {
        case 'create-task':
          // 1. Create the message for the task
          const taskMessageDto: CreateMessageDto = {
            conversationId,
            app_type,
            message_type,
            content: { text: payload.title },
          };
          const message = await this.messagesService.create(taskMessageDto, user);

          // 2. Create the task and link it to the message
          task = await this.tasksService.create({
            messageId: message.id,
            userId: user.userId,
          });

          responsePayload = { ...message, task };
          break;

        case 'update-task-status':
          task = await this.tasksService.updateStatus(payload.taskId, payload.status);
          messageContentText = `Task status updated to ${payload.status}`;
          break;
        case 'update-task-due-date':
          task = await this.tasksService.updateDueDate(payload.taskId, payload.dueDate);
          messageContentText = `Task due date updated to ${payload.dueDate}`;
          break;
        case 'assign-task':
          task = await this.tasksService.assignTask(payload.taskId, payload.assigneeId);
          messageContentText = `Task assigned to user ${payload.assigneeId}`;
          break;
        default:
          return { status: 'error', message: 'Invalid task message type' };
      }

      // For update cases, create a new message logging the change
      if (message_type !== 'create-task') {
        const updateMessageDto: CreateMessageDto = {
          conversationId,
          app_type,
          message_type,
          content: { text: messageContentText },
          parentMessageId: task.messageId, // Link to the original task message
        };
        const updateMessage = await this.messagesService.create(updateMessageDto, user);
        responsePayload = { ...updateMessage, task };
      }

      this.server.to(conversationId).emit('newMessage', responsePayload);
      return { status: 'ok', data: responsePayload };
    }

    // Default message handling
    const message = await this.messagesService.create(createMessageDto, user);
    this.server.to(conversationId).emit('newMessage', message);
    return { status: 'ok', data: message };
  }

  @SubscribeMessage('message:mark_as_delivered')
  async handleMarkAsDelivered(
    @MessageBody() { messageId }: { messageId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const user = client.handshake['user'];
    const updatedMessage = await this.messagesService.updateStatus(messageId, MessageStatus.DELIVERED, user.userId);
    this.server.to(updatedMessage.conversationId).emit('message:status_updated', updatedMessage);
  }

  @SubscribeMessage('message:mark_as_read')
  async handleMarkAsRead(
    @MessageBody() { messageId }: { messageId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const user = client.handshake['user'];
    const updatedMessage = await this.messagesService.updateStatus(messageId, MessageStatus.READ, user.userId);
    this.server.to(updatedMessage.conversationId).emit('message:status_updated', updatedMessage);
  }
}
