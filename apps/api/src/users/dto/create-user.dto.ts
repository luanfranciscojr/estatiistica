import { ArrayNotEmpty, ArrayUnique, IsIn, IsArray, IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { ROLE_CODES, RoleCodeValue } from '../../common/constants';

export class CreateUserDto {
  @IsString()
  nome!: string;

  @IsString()
  login!: string;

  @IsString()
  @MinLength(6)
  senha!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIn(ROLE_CODES, { each: true })
  roles!: RoleCodeValue[];

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
