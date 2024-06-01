import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanySectorDto {
  @ApiProperty({ description: 'este el tipo de sector' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateCompanySectorDto extends PartialType(
  CreateCompanySectorDto,
) {}
