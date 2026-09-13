import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateProgramaDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  participantes?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  amarelinhos?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  lideres?: number;
}
