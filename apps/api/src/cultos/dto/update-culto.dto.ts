import { IsInt, Min } from 'class-validator';

export class UpdateCultoDto {
  @IsInt()
  @Min(0)
  total!: number;
}
