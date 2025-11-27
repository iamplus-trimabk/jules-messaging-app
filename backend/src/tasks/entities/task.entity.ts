import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Message } from '../../messages/entities/message.entity';
import { User } from '../../users/entities/user.entity';
import { TaskStatus } from '../enums/task-status.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Message, { onDelete: 'CASCADE' }) // If the message is deleted, the task is deleted
  @JoinColumn({ name: 'messageId' })
  message: Message;

  @Column()
  messageId: string;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: string;

  @ManyToOne(() => User, { nullable: true, eager: true }) // Eagerly load the assignee
  @JoinColumn({ name: 'assigneeId' })
  assignee: User;

  @Column({ nullable: true })
  assigneeId: string;

  @Column({
    type: 'simple-enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;
}
