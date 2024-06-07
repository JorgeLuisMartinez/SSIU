import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Variable } from './variable.entity';
import { Status } from '../../users/entities/status.entity';
import { Questions } from './questions.entity';

@Entity()
export class Indicator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  name: string;

  @ManyToOne(() => Status, (status) => status.indicator)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => Variable, (variables) => variables.indicator)
  @JoinColumn({ name: 'variable_id' })
  variable: Variable;

  @OneToMany(() => Questions, (questions) => questions.indicator)
  questions: Questions[];
}
