import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import { AcademicData } from './academicData.entity';

@Entity()
export class StudyTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  description: string;

  @OneToMany(() => AcademicData, (academicData) => academicData.studyType)
  academicData: AcademicData[];
}
