import { ArrayNotEmpty, ArrayUnique, IsIn, IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ROLE_CODES, RoleCodeValue } from '../../common/constants';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIn(ROLE_CODES, { each: true })
  roles?: RoleCodeValue[];
}
