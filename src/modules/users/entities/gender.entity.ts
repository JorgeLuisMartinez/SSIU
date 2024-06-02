import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  description: string;

  @OneToMany(() => User, (user) => user.gender)
  user: User[];
}
