import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Message, MessageStatus } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesQueryDto } from './dto/get-messages-query.dto';
import { User } from '../users/entities/user.entity';
import { ConversationParticipant } from '../conversations/entities/conversation-participant.entity';
import { MessageDto } from './dto/message.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(ConversationParticipant)
    private readonly participantRepository: Repository<ConversationParticipant>,
  ) {}

  async create(createMessageDto: CreateMessageDto, sender: User): Promise<MessageDto> {
    const { conversationId, content } = createMessageDto;

    // Verify that the sender is a participant in the conversation
    const participant = await this.participantRepository.findOne({
      where: { conversationId, userId: sender.id },
    });

    if (!participant) {
      throw new ForbiddenException('You are not a member of this conversation.');
    }

    const message = this.messageRepository.create({
      senderId: sender.id,
      conversationId,
      content,
    });

    const savedMessage = await this.messageRepository.save(message);

    // The sender is eagerly loaded on the Message entity
    return plainToClass(MessageDto, savedMessage);
  }

  async findByConversationId(
    conversationId: string,
    query: GetMessagesQueryDto,
    userId: string
  ): Promise<MessageDto[]> {
    // Verify that the user is a participant in the conversation
    const participant = await this.participantRepository.findOne({
        where: { conversationId, userId },
    });

    if (!participant) {
        throw new ForbiddenException('You are not a member of this conversation.');
    }

    const { limit, before } = query;
    const queryBuilder = this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .where('message.conversationId = :conversationId', { conversationId })
      .orderBy('message.createdAt', 'DESC')
      .take(limit);

    if (before) {
        const cursor = await this.messageRepository.findOne({ where: { id: before } });
        if (cursor) {
            queryBuilder.andWhere('message.createdAt < :cursor', { cursor: cursor.createdAt });
        }
    }

    const messages = await queryBuilder.getMany();
    return messages.map(m => plainToClass(MessageDto, m));
  }

  async updateStatus(messageId: string, status: MessageStatus, userId: string): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id: messageId } });
    if (!message) {
      throw new NotFoundException('Message not found.');
    }

    const participant = await this.participantRepository.findOne({
      where: { conversationId: message.conversationId, userId },
    });

    if (!participant) {
      throw new ForbiddenException('You are not a member of this conversation.');
    }

    await this.messageRepository.update(messageId, { status });
    return this.messageRepository.findOne({ where: { id: messageId } });
  }
}
