import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'este es el email del usuario' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'este es el email alternativo del usuario' })
  readonly alt_email: string;

  @ApiProperty({ description: 'esta es la contraseña del usuario' })
  readonly password: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly dni: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly phone_number: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly dniTypeId: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly statusId: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly genderId: number;

  @ApiProperty({ description: '' })
  @IsArray()
  @IsNotEmpty()
  readonly rolesId: number[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
