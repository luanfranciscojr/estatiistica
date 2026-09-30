import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ManualMateriaDto {
  @IsString()
  materia!: string;

  @IsArray()
  professores!: string[];

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  datas_aulas!: string[];
}

class ManualSalaDto {
  @IsOptional()
  @IsString()
  codigo?: string;

  @IsString()
  nome!: string;

  @IsOptional()
  @IsString()
  local?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(2)
  sessao_senib!: number;

  @ValidateNested({ each: true })
  @Type(() => ManualMateriaDto)
  @ArrayMinSize(1)
  materias!: ManualMateriaDto[];
}

export class CreateManualRodadaDto {
  @IsString()
  referencia!: string;

  @IsOptional()
  @IsString()
  turno?: string;

  @ValidateNested({ each: true })
  @Type(() => ManualSalaDto)
  @ArrayMinSize(1)
  salas!: ManualSalaDto[];
}
