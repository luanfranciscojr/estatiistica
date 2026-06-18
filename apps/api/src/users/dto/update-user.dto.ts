import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { RoleCodeValue } from '../../common/constants';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsArray()
  roles?: RoleCodeValue[];
}
