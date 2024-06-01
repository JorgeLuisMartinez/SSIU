import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class StudyTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  description: string;

  // @OneToMany(() => User, (user) => user.dni_type) // Relación OneToMany con la entidad User
  // user: User[]; // Propiedad que mantiene la relación con User
}
