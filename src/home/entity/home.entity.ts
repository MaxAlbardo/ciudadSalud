import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Square } from "../enum/home.enum";


@Entity()
export class Home {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    n_rooms: number;

    @Column()
    n_population: number;

    @Column()
    n_bathrooms: number;

    @Column()
    n_home: number;

    @Column({ type: "varchar"})
    street: string;

    @Column()
    square: Square;
}
