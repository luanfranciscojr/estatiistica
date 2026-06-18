import { IsArray, IsBoolean, IsInt, IsOptional, IsString, ValidateIf } from 'class-validator';

export class ImportRodadaDto {
  @IsOptional()
  @ValidateIf((value) => value.nib_rodada_id === undefined)
  @IsString()
  external_id?: string;

  @IsOptional()
  @ValidateIf((value) => !value.external_id)
  @IsInt()
  nib_rodada_id?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selected_aulas?: string[];

  @IsOptional()
  @IsBoolean()
  forcar?: boolean;
}
