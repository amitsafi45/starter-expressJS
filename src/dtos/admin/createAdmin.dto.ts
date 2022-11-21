import { Type } from "class-transformer";
import { IsArray, isBoolean, IsBooleanString, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, Length, MinLength, validate, Validate, ValidateNested, validateSync } from "class-validator";
import { Permission } from "../../constants/global";
import {  RoleLevels } from "../../entities/admin/admin.entity";
import { IsStrongPassword } from "./../custom/passwordStrength";


export class PermissionDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    project: string

    @IsNotEmpty()
    @IsArray()
    @IsEnum(Permission, { each: true })
    permissions: Permission[]
}
export class UpdatePermissionDTO {
    @IsNotEmpty()
    @IsUUID()
    id:string

    @IsDefined()
    @ValidateNested()
    @Type(() => PermissionDTO)
    permissions: PermissionDTO[]

}
export class CreateAdminDTO {
    @IsString()
    @Length(2, 40)
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @Validate(IsStrongPassword)
    password: string

    @IsNotEmpty()
    @IsEnum(RoleLevels)
    roleLevel: RoleLevels

 
    @IsDefined()
    @ValidateNested()
    @Type(() => PermissionDTO)
    permissions: PermissionDTO[]

}







