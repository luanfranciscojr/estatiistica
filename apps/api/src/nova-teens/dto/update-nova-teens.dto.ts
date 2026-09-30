import { IsInt, IsOptional, Min } from 'class-validator';

import { CounterActionDto } from '../../common/counter-action.dto';

export class UpdateNovaTeensDto extends CounterActionDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  teens?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  lideres?: number;
}
