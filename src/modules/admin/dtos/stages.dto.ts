import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStageDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: '' })
  @IsDate()
  @IsNotEmpty()
  readonly start_date: Date;

  @ApiProperty({ description: '' })
  @IsDate()
  @IsNotEmpty()
  readonly finish_date: Date;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly type_MDI: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly statusId: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly academicProgramId: number;
}

export class UpdateStageDto extends PartialType(CreateStageDto) {}
