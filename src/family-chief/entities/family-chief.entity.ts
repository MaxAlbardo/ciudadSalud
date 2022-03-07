import { Column, Entity, PrimaryColumn } from "typeorm";
import { Property } from "../enum/family-chief.enum";

@Entity()
export class FamilyChief {
    @PrimaryColumn()
    id: string;

    @Column()
    numberPhone: string;

    @Column()
    property: Property;
}
