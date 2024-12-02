import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'workers' })
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  logo: string;
}
