import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ description: 'este es el status' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateStatusDto extends PartialType(CreateStatusDto) {}
