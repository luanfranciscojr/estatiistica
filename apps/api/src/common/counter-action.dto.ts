import { IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class CounterActionDto {
  @IsOptional()
  @IsIn(['alunos', 'verdinhos', 'amarelinhos', 'professor', 'participantes', 'teens', 'lideres', 'total'])
  categoria?: string;

  @IsOptional()
  @IsIn(['incremento', 'decremento', 'ajuste'])
  operacao?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  valor?: number;
}
