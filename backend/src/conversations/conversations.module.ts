import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { UsersModule } from '../users/users.module';
import { ConversationAdminGuard } from './guards/conversation-admin.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, ConversationParticipant]),
    UsersModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationAdminGuard],
})
export class ConversationsModule {}
