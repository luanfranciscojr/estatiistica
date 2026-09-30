import { IsInt, IsOptional, Min } from 'class-validator';

import { CounterActionDto } from '../../common/counter-action.dto';

export class UpdateProgramaDto extends CounterActionDto {
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
