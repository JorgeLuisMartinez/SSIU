import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CompanySector } from './companySector.entity';
import { User } from './user.entity';

// import DateAt from '../../database/globalEntities/basic.entity';
@Entity()
export class EmploymentData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'bigint', length: '50' })
  phone: number;

  @Column({ type: 'varchar', length: '255' })
  address: string;

  @Column({ type: 'varchar', length: '255' })
  job_role: string;

  @Column({ type: 'varchar', length: '255', unique: true })
  email: string;

  @Column({ type: 'varchar', length: '50', unique: true })
  nationality: string;

  @ManyToOne(
    () => CompanySector,
    (companySector) => companySector.employmnetData,
  )
  @JoinColumn({ name: 'company_sector_id' })
  companySector: CompanySector;

  @ManyToOne(() => User, (user) => user.employmnetData)
  @JoinColumn({ name: 'user_id' })
  user: User[];
}
