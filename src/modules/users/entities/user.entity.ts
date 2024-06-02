import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Gender } from './gender.entity';
import { DniType } from './dniType.entity';
import { Role } from './role.entity';
import { Status } from './status.entity';
import { EmploymentData } from './employmentData.entity';
import { AcademicData } from './academicData.entity';

// import DateAt from '../../database/globalEntities/basic.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  name: string;

  @Column({ type: 'varchar', length: '50' })
  last_name: string;

  @Column({ type: 'bigint', unique: true })
  dni: number;

  @Column({ type: 'bigint', unique: true })
  phone_number: number;

  @Column({ type: 'varchar', length: '255', unique: true })
  email: string;

  @Column({ type: 'varchar', length: '255', unique: true })
  alt_email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(() => Status, (status) => status.user)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => Gender, (gender) => gender.user) // Relación ManyToOne con la entidad Gender
  @JoinColumn({ name: 'gender_id' })
  gender: Gender; // Propiedad que mantiene la relación con Gender

  @ManyToOne(() => DniType, (dniType) => dniType.user)
  @JoinColumn({ name: 'dniType_id' })
  dni_type: DniType;

  @OneToMany(() => EmploymentData, (employmnetData) => employmnetData.user)
  employmnetData: EmploymentData[];

  @OneToMany(() => AcademicData, (academicData) => academicData.user)
  academicData: AcademicData[];

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({
    name: 'roles_users',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  role: Role[]; // Propiedad que mantiene la relación con Gender
}
