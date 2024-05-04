import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  description: string;

  @ManyToMany(() => User, (user) => user.role)
  user: User[];
}
