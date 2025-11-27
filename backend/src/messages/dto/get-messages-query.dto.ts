import { IsOptional, IsUUID, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesQueryDto {
  @ApiProperty({
    required: false,
    description: 'Cursor for pagination (a message ID)',
  })
  @IsOptional()
  @IsUUID()
  before?: string;

  @ApiProperty({
    required: false,
    description: 'The maximum number of messages to return',
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;
}
