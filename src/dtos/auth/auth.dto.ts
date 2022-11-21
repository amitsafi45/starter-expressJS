import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsStrongPassword } from "../custom/passwordStrength";

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Validate(IsStrongPassword)
    password: string;
}

