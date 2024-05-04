import { PrimaryGeneratedColumn, Column, Entity, OneToMany} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity()

export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '50'})
  description: string;

  @OneToMany(() => User, user => user.role) // Relación OneToMany con la entidad User
  user: User[]; // Propiedad que mantiene la relación con User
}
