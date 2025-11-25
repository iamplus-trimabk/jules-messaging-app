import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { AddParticipantsDto } from './dto/add-participants.dto';
import { User } from '../users/entities/user.entity';
import { ParticipantRole } from './enums/participant-role.enum';
import { ConversationDto } from './dto/conversation.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(ConversationParticipant)
    private readonly participantRepository: Repository<ConversationParticipant>,
  ) {}

  async create(createConversationDto: CreateConversationDto, creator: User): Promise<ConversationDto> {
    const conversation = this.conversationRepository.create({
      title: createConversationDto.title,
      type: createConversationDto.type,
      tags: createConversationDto.tags,
    });

    const savedConversation = await this.conversationRepository.save(conversation);

    // Add the creator as an admin participant
    const participants = createConversationDto.participants.map(p =>
        this.participantRepository.create({
            conversationId: savedConversation.id,
            userId: p.userId,
            role: p.role
        })
    );

    // Ensure the creator is always an admin
    const creatorParticipant = this.participantRepository.create({
        conversationId: savedConversation.id,
        userId: creator.id,
        role: ParticipantRole.ADMIN,
    });

    // Avoid adding the creator twice if they are already in the list
    if (!participants.find(p => p.userId === creator.id)) {
        participants.push(creatorParticipant);
    } else {
        const existing = participants.find(p => p.userId === creator.id);
        existing.role = ParticipantRole.ADMIN;
    }

    await this.participantRepository.save(participants);

    const fullConversation = await this.findById(savedConversation.id, creator.id);
    return plainToClass(ConversationDto, fullConversation);
  }

  async findByUserId(userId: string): Promise<ConversationDto[]> {
    const conversations = await this.conversationRepository.createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.participants', 'participant')
        .leftJoinAndSelect('participant.user', 'user')
        .where('participant.userId = :userId', { userId })
        .getMany();

    return conversations.map(c => plainToClass(ConversationDto, c));
  }

  async findById(conversationId: string, userId: string): Promise<ConversationDto> {
    const conversation = await this.conversationRepository.findOne({
        where: { id: conversationId },
        relations: ['participants', 'participants.user'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found.');
    }

    // Ensure the user is a participant of the conversation
    if (!conversation.participants.some(p => p.userId === userId)) {
        throw new ForbiddenException('You are not a member of this conversation.');
    }

    return plainToClass(ConversationDto, conversation);
  }

  async addParticipants(conversationId: string, addParticipantsDto: AddParticipantsDto, actor: User): Promise<ConversationDto> {
    const newParticipants = addParticipantsDto.participants.map(p =>
      this.participantRepository.create({
        conversationId: conversationId,
        userId: p.userId,
        role: p.role,
      }),
    );

    await this.participantRepository.save(newParticipants);

    return this.findById(conversationId, actor.id); // Return the updated conversation
  }
}
