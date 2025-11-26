import { Controller, Get, Query, Param, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessageDto } from './dto/message.dto';

@Controller('conversations/:id/messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(
    @Param('id') conversationId: string,
    @Query() query: GetMessagesQueryDto,
    @Request() req,
  ): Promise<MessageDto[]> {
    return this.messagesService.findByConversationId(conversationId, query, req.user.userId);
  }
}
