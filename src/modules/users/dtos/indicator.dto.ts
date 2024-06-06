import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIndicatorDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly variableId: number;
}

export class UpdateIndicatorDto extends PartialType(CreateIndicatorDto) {}
