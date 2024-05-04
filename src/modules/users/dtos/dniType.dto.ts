import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDniTypeDto {
  @ApiProperty({ description: 'este el tipo de dni' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateDniTypeDto extends PartialType(CreateDniTypeDto) {}
