import { IsOptional, IsString, IsArray, IsEnum, IsDateString, IsInt, Min } from 'class-validator';

export class FilterArticleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(['draft', 'published', 'archived'])
  status?: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minViews?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxViews?: number;
}
