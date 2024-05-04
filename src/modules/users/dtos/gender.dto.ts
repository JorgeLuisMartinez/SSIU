import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @ApiProperty({ description: 'este es el genero' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateGenderDto extends PartialType(CreateGenderDto) {}
