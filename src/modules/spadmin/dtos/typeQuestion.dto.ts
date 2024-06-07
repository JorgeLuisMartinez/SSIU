import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeQuestionDto {
  @ApiProperty({ description: '' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateTypeQuestionDto extends PartialType(CreateTypeQuestionDto) {}
