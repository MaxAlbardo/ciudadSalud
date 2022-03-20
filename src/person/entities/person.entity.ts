import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../enum/person.enum';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  bornDate: Date;

  @Column()
  gender: Gender;
}
