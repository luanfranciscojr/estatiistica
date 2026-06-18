import { IsString, MinLength } from 'class-validator';

export class PreviewParserDto {
  @IsString()
  @MinLength(3)
  texto!: string;
}
