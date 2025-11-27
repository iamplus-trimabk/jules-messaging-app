import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { ConversationsModule } from '../conversations/conversations.module';
import { MessagesGateway } from './messages.gateway';
import { AuthModule } from '../auth/auth.module';
import { MessagesController } from './messages.controller';
import { ConversationParticipant } from '../conversations/entities/conversation-participant.entity';
import { UsersModule } from '../users/users.module';
import { TasksModule } from '../tasks/tasks.module';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, ConversationParticipant, Task]),
    ConversationsModule,
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
