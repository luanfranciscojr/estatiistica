import { IsArray, IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { RoleCodeValue } from '../../common/constants';

export class CreateUserDto {
  @IsString()
  nome!: string;

  @IsString()
  login!: string;

  @IsString()
  @MinLength(6)
  senha!: string;

  @IsArray()
  roles!: RoleCodeValue[];

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
