import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVariableDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly status: string;
}

export class UpdateVariableDto extends PartialType(CreateVariableDto) {}
