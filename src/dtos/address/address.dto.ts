import { IsNotEmpty, IsNumber, IsString,IsOptional } from "class-validator";

class AddressDTO {
    @IsNotEmpty()
    @IsNumber()
    provinceId: number;

    @IsNotEmpty()
    @IsNumber()
    districtId: number;

    @IsNotEmpty()
    @IsNumber()
    municipalityId: number;

    @IsNotEmpty()
    @IsNumber()
    wardId: number;

    @IsNotEmpty()
    @IsString()
    village: string
}



export default AddressDTO;