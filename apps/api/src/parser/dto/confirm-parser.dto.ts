import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class ConfirmParserItemDto {
  @IsString()
  sala!: string;

  @IsObject()
  contagens!: {
    alunos?: number;
    verdinhos?: number;
    amarelinhos?: number;
    professor?: number;
  };
}

export class ConfirmParserDto {
  @IsInt()
  rodadaId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  sessao_senib?: number;

  @IsOptional()
  @IsString()
  aula_ref?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfirmParserItemDto)
  items!: ConfirmParserItemDto[];
}
