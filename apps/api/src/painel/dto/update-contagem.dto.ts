import { IsIn, IsString } from 'class-validator';
import { CONTAGEM_CATEGORIAS, CONTAGEM_OPERACOES } from '../../common/constants';

export class UpdateContagemDto {
  @IsString()
  @IsIn(CONTAGEM_CATEGORIAS)
  categoria!: (typeof CONTAGEM_CATEGORIAS)[number];

  @IsString()
  @IsIn(CONTAGEM_OPERACOES)
  operacao!: (typeof CONTAGEM_OPERACOES)[number];
}
