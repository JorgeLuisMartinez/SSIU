import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolesDto {
  @ApiProperty({ description: 'este es el role' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateRolesDto extends PartialType(CreateRolesDto) {}
