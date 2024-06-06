import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Variable } from './variable.entity';

// import { User } from './user.entity';
// import { StudyTypes } from './studyTypes.entity';
@Entity()
export class Indicator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'varchar', length: '255' })
  status: string;

  @ManyToOne(() => Variable, (variables) => variables.indicator)
  @JoinColumn({ name: 'variable_id' })
  variables: Variable;
}
