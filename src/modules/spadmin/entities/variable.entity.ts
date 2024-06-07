import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Indicator } from './indicator.entity';
import { Status } from '../../users/entities/status.entity';

@Entity()
export class Variable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  name: string;

  @ManyToOne(() => Status, (status) => status.variable)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => Indicator, (indicator) => indicator.variable)
  indicator: Indicator[];
}
