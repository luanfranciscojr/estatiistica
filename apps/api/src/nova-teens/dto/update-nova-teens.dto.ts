import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateNovaTeensDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  teens?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  lideres?: number;
}
