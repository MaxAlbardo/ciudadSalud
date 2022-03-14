import { IsDate, IsString } from "class-validator";
import { Gender } from "../enum/person.enum";

export class CreatePersonDto {
    id?: number;

    @IsString()
    dni: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsDate()
    bornDate: Date;

    @IsString()
    gender: Gender;
}
