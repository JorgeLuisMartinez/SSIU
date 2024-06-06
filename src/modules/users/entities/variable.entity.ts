import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import { Indicator } from './indicator.entity';

@Entity()
export class Variable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'varchar', length: '255' })
  status: string;

  @OneToMany(() => Indicator, (indicator) => indicator.variables)
  indicator: Indicator[];
}
