import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAcademicProgramsDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly code: number;

  @ApiProperty({ description: '' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly photoUrl: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly statusId: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}

export class UpdateAcademicProgramsDto extends PartialType(
  CreateAcademicProgramsDto,
) {}
