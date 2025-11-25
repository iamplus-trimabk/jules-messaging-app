import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConversationDto } from './dto/conversation.dto';
import { AddParticipantsDto } from './dto/add-participants.dto';
import { ConversationAdminGuard } from './guards/conversation-admin.guard';

@Controller('conversations')
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  create(
    @Body() createConversationDto: CreateConversationDto,
    @Request() req,
  ): Promise<ConversationDto> {
    // req.user is populated by the JwtStrategy from the token
    return this.conversationsService.create(createConversationDto, req.user);
  }

  @Get()
  findAll(@Request() req): Promise<ConversationDto[]> {
    return this.conversationsService.findByUserId(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<ConversationDto> {
    return this.conversationsService.findById(id, req.user.userId);
  }

  @Post(':id/participants')
  @UseGuards(ConversationAdminGuard)
  addParticipants(
    @Param('id') id: string,
    @Body() addParticipantsDto: AddParticipantsDto,
    @Request() req,
  ): Promise<ConversationDto> {
    // We pass req.user.userId to the service to maintain a consistent pattern,
    // although the guard has already performed the necessary checks.
    return this.conversationsService.addParticipants(id, addParticipantsDto, req.user);
  }
}
