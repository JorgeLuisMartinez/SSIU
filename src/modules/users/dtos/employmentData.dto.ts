import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEmploymentDataDto {
  @ApiProperty({ description: 'este es el email de la empresa' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly job_role: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly nationality: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly companySectorId: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}

export class UpdateEmploymentDataDto extends PartialType(
  CreateEmploymentDataDto,
) {}
