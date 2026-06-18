import { SetMetadata } from '@nestjs/common';
import { RoleCodeValue } from './constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleCodeValue[]) => SetMetadata(ROLES_KEY, roles);
