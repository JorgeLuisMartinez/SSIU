import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Geographic_location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '50' })
  description: string;

  @OneToMany(() => User, (user) => user.gender) // Relación OneToMany con la entidad User
  user: User[]; // Propiedad que mantiene la relación con User
}
