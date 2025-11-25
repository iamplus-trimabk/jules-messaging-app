import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ConversationType } from '../enums/conversation-type.enum';
import { ConversationParticipant } from './conversation-participant.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'simple-enum',
    enum: ConversationType,
  })
  type: ConversationType;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @OneToMany(() => ConversationParticipant, (participant) => participant.conversation)
  participants: ConversationParticipant[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
