import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Questions } from '../../spadmin/entities/questions.entity';
import { Variable } from '../../spadmin/entities/variable.entity';
import { Indicator } from '../../spadmin/entities/indicator.entity';
import { AcademicPrograms } from '../../spadmin/entities/academicPrograms.entity';
import { Requests } from '../../spadmin/entities/requests.entity';
import { Stages } from '../../admin/entities/stages.entity';

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

  @OneToMany(
    () => AcademicPrograms,
    (academicProgram) => academicProgram.status,
  )
  academicProgram: AcademicPrograms[];

  @OneToMany(() => Requests, (request) => request.status)
  request: Requests[];

  @OneToMany(() => Stages, (stage) => stage.status)
  stage: Stages[];
}
