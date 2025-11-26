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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { ConversationsService } from '../conversations/conversations.service';
import { UsersService } from '../users/users.service';

@UseGuards(WsJwtGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessagesGateway');

  constructor(
    private readonly messagesService: MessagesService,
    private readonly conversationsService: ConversationsService,
    private readonly usersService: UsersService,
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
  ): Promise<any> { // The return type is for the acknowledgment
    const user = client.handshake['user'];
    const message = await this.messagesService.create(createMessageDto, user);

    // Broadcast the new message to the conversation room
    this.server.to(createMessageDto.conversationId).emit('newMessage', message);

    // Send an acknowledgment back to the sender
    return { status: 'ok', message };
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
      @MessageBody() { messageId }: { messageId: string },
      @ConnectedSocket() client: Socket
  ): Promise<void> {
    const user = client.handshake['user'];
    const updatedMessage = await this.messagesService.updateStatus(messageId, MessageStatus.READ, user.userId);

    // Broadcast the status update to the entire conversation
    this.server.to(updatedMessage.conversationId).emit('messageStatusUpdate', {
        messageId: updatedMessage.id,
        status: updatedMessage.status
    });
  }
}
