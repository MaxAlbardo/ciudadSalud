import { FamilyChief } from 'src/family-chief/entities/family-chief.entity';
import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { relationShipEnum } from '../enum/family-group.enum';

@Entity()
export class FamilyGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  relationship: relationShipEnum;

  @OneToOne(() => Person, { eager: true })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @ManyToOne(() => FamilyChief, (chief) => chief.group, { eager: true })
  chief: FamilyChief;
}
