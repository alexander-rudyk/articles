import { IsOptional, IsString, IsEnum } from 'class-validator';

export class SortDto {
  @IsOptional()
  @IsString()
  sortBy: string = 'created_at';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order: string = 'desc';
}
