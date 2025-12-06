import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { TaskStatus } from '../enums/task-status.enum';

export { TaskStatus };

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Message)
  @JoinColumn({ name: 'messageId' })
  message: Message;

  @Column({ nullable: true })
  messageId: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'simple-enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({ type: 'datetime', nullable: true })
  dueDate: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee: User;

  @Column({ nullable: true })
  assigneeId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ nullable: true })
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
