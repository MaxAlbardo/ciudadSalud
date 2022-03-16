import { FamilyChief } from 'src/family-chief/entities/family-chief.entity';
import { Person } from 'src/person/entities/person.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { relationShipEnum } from '../enum/family-group.enum';

@Entity()
export class FamilyGroup {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  relationship: relationShipEnum;

  @OneToOne(() => Person, { eager: true })
  @JoinColumn({ name: 'id' })
  person: Person;

  @ManyToOne(() => FamilyChief, (chief) => chief.group)
  chief: FamilyChief;
}
