import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class AddManualAulasDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  datas_aulas!: string[];
}
