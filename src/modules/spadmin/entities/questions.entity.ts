import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TypeQuestion } from './typeQuestion.entity';
import { Indicator } from './indicator.entity';
import { Status } from '../../users/entities/status.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '1000' })
  description: string;

  @ManyToOne(() => TypeQuestion, (typeQuestion) => typeQuestion.questions)
  @JoinColumn({ name: 'type_question_id' })
  typeQuestion: TypeQuestion;

  @ManyToOne(() => Status, (status) => status.questions)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => Indicator, (indicator) => indicator.questions)
  @JoinColumn({ name: 'indicator_id' })
  indicator: Indicator;
}
