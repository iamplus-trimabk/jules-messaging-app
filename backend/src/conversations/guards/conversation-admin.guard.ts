import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationParticipant } from '../entities/conversation-participant.entity';
import { ParticipantRole } from '../enums/participant-role.enum';

@Injectable()
export class ConversationAdminGuard implements CanActivate {
  constructor(
    @InjectRepository(ConversationParticipant)
    private readonly participantRepository: Repository<ConversationParticipant>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // User object from JwtAuthGuard
    const conversationId = request.params.id;

    if (!user || !conversationId) {
      return false;
    }

    const participant = await this.participantRepository.findOne({
      where: {
        userId: user.userId,
        conversationId,
      },
    });

    if (participant && participant.role === ParticipantRole.ADMIN) {
      return true;
    }

    throw new ForbiddenException('You must be an admin of this conversation to perform this action.');
  }
}
