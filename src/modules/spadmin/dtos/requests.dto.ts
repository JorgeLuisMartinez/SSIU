import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequestsDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly reason: string;

  @ApiProperty({ description: '' })
  @IsDate()
  @IsNotEmpty()
  readonly attention_date: Date;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly statusId: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @IsNotEmpty()
  readonly stageId: number;
}

export class UpdateRequestsDto extends PartialType(CreateRequestsDto) {}
