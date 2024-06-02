import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './user.entity';
import { StudyTypes } from './studyTypes.entity';

@Entity()
export class AcademicData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  academic_title: string;

  @Column({ type: 'varchar', length: '255' })
  institution_name: string;

  @Column({ type: 'varchar', length: '50' })
  nationality: string;

  @Column({ type: 'timestamp' })
  degree_date: Date;

  @ManyToOne(() => StudyTypes, (studyTypes) => studyTypes.academicData)
  @JoinColumn({ name: 'study_type_id' })
  studyType: StudyTypes;

  @ManyToOne(() => User, (user) => user.academicData)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
