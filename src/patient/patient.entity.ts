import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  userId!: string;

  @Column()
  fullName!: string;

  @Column()
  age!: number;

  @Column()
  gender!: string;

  @Column()
  contactDetails!: string;

  @Column({ nullable: true })
  basicHealthInfo!: string;
}
