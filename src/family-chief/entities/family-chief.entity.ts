import { Home } from 'src/home/entity/home.entity';
import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Property } from '../enum/family-chief.enum';

@Entity()
export class FamilyChief {
  @PrimaryColumn()
  id: Person;

  @Column()
  numberPhone: string;

  @Column()
  property: Property;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'id' })
  person: Person;

  @ManyToOne(() => Home, (home) => home.familyChief)
  home: Home;
}
