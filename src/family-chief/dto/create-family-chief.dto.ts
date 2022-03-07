import { IsString } from "class-validator";
import { Property } from "../enum/family-chief.enum";

export class CreateFamilyChiefDto {
    @IsString()
    id: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    property: Property;

    
}
