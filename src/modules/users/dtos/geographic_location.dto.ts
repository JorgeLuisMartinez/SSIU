import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeographic_locationDto {
  @ApiProperty({ description: 'esta es la ubicación de la empresa' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
export class UpdateGeographic_locationDto extends PartialType(CreateGeographic_locationDto) {}
