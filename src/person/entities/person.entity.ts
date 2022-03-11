import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { Gender } from '../enum/person.enum';

@Entity()
export class Person {
  @PrimaryColumn()
  id: number;

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

  @BeforeInsert()
  @BeforeUpdate()
  async setId() {
    if (!this.dni) {
      return;
    }
    this.id = await parseInt(this.dni);
  }
}
