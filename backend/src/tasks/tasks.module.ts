import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { ConversationsModule } from '../conversations/conversations.module';
import { ConversationParticipant } from '../conversations/entities/conversation-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, ConversationParticipant]),
    ConversationsModule, // Needed for permission checking
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService], // Export for use in the MessagesGateway later
})
export class TasksModule {}
