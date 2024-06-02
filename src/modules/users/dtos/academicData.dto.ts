import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAcademicDataDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly academic_title: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly institution_name: string;

  @ApiProperty({ description: '' })
  @IsDate()
  @IsNotEmpty()
  readonly degree_date: Date;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly nationality: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly studyTypesID: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}

export class UpdateAcademicDataDto extends PartialType(CreateAcademicDataDto) {}
