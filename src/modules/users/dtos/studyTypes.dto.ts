import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudyTypesDto {
  @ApiProperty({ description: 'este el tipo de estudio' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateStudyTypesDto extends PartialType(CreateStudyTypesDto) {}
