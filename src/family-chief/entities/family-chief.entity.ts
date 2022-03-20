import { FamilyGroup } from 'src/family-group/entities/family-group.entity';
import { Home } from 'src/home/entity/home.entity';
import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from '../enum/family-chief.enum';

@Entity()
export class FamilyChief {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numberPhone: string;

  @Column()
  property: Property;

  @OneToOne(() => Person, { eager: true })
  @JoinColumn({ name: 'PersonId' })
  person: Person;

  @ManyToOne(() => Home, (home) => home.familyChief, { eager: true })
  home: Home;

  @OneToMany(() => FamilyGroup, (group) => group.chief)
  group: FamilyGroup;
}
