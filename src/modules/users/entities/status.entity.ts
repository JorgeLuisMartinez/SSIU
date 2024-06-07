import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Questions } from '../../spadmin/entities/questions.entity';
import { Variable } from '../../spadmin/entities/variable.entity';
import { Indicator } from '../../spadmin/entities/indicator.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  description: string;

  @OneToMany(() => User, (user) => user.status)
  user: User[];

  @OneToMany(() => Questions, (questions) => questions.status)
  questions: Questions[];

  @OneToMany(() => Variable, (variable) => variable.status)
  variable: Variable[];

  @OneToMany(() => Indicator, (indicator) => indicator.status)
  indicator: Indicator[];
}
