import { IsInt, IsOptional, Min } from 'class-validator';
import { CounterActionDto } from '../../common/counter-action.dto';

export class UpdateCultoDto extends CounterActionDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  total?: number;
}
