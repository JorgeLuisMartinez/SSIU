import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class TypeQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  description: string;

  @OneToMany(() => Questions, (questions) => questions.typeQuestion)
  questions: Questions[];
}
