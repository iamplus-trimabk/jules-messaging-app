import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { MessageStatus } from '../enums/message-status.enum';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @Column()
  senderId: string;

  @ManyToOne(() => Conversation)
  @JoinColumn({ name: 'conversationId' })
  conversation: Conversation;

  @Column()
  conversationId: string;

  @Column({ type: 'simple-json' })
  content: object; // Relaxed to a generic object for different message types

  @Column({ nullable: true })
  app_type: string; // e.g., 'TASKS'

  @Column({ nullable: true })
  message_type: string; // e.g., 'TASK_CREATED', 'COMMENT'

  @ManyToOne(() => Message, (message) => message.children, { nullable: true })
  @JoinColumn({ name: 'parentMessageId' })
  parentMessage: Message;

  @Column({ nullable: true })
  parentMessageId: string;

  @OneToMany(() => Message, (message) => message.parentMessage)
  children: Message[];

  @Column({
    type: 'simple-enum',
    enum: MessageStatus,
    default: MessageStatus.SENT,
  })
  status: MessageStatus;

  @CreateDateColumn()
  createdAt: Date;

}
