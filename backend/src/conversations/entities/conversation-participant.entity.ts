import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Conversation } from './conversation.entity';
import { ParticipantRole } from '../enums/participant-role.enum';

@Entity('conversation_participants')
export class ConversationParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true }) // Eagerly load the user for convenience
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @Column()
  conversationId: string;

  @Column({
    type: 'simple-enum',
    enum: ParticipantRole,
  })
  role: ParticipantRole;
}
