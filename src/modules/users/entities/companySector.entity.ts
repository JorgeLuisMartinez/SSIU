import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

import { EmploymentData } from './employmentData.entity';

@Entity()
export class CompanySector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  description: string;

  @OneToMany(
    () => EmploymentData,
    (employmnetData) => employmnetData.companySector,
  )
  employmnetData: EmploymentData[];
}
