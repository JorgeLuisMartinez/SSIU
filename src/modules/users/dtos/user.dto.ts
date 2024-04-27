import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber  } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'este es el email del usuario'})
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'esta es la contraseña del usuario'})
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: ''})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: ''})
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty({ description: ''})
  @IsNumber()
  @IsNotEmpty()
  readonly dni: number;

  @ApiProperty({ description: ''})
  @IsNumber()
  @IsNotEmpty()
  readonly phone_number: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
