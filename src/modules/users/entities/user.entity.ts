import { PrimaryGeneratedColumn, Column, Entity} from 'typeorm';
import { Exclude } from 'class-transformer';

import DateAt from '../../database/globalEntities/basic.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '50'})
  name: string;

  @Column({type: 'varchar', length: '50'})
  last_name: string;

  @Column({type: 'integer', unique: true})
  dni: number;

  @Column({type: 'integer', unique: true})
  phone_number: number;

  @Column({type: 'varchar', length: '255', unique: true})
  email: string;

  @Exclude()
  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'varchar'})
  role: string;
}
