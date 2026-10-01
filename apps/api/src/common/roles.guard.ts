import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from './authenticated-request.interface';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const grantedRoles = request.user?.roles ?? [];
    const moduleRoles: Record<string, string> = {
      'nova-jovens': 'nova_jovens',
      cultos: 'estatistica_culto', 'nova-teens': 'nova_teens',
      'um-com-deus': 'um_com_deus', 'nova-baby': 'nova_baby',
      'nova-infantil': 'nova_infantil', 'nova-kids': 'nova_kids',
    };
    const scoped = !grantedRoles.some((role) => ['admin', 'estatistica', 'verdinho', 'pastor'].includes(role));
    const path = request.path.replace(/^\/api\//, '').split('/');
    if (grantedRoles.includes('nova_jovens') && (
      (path[0] === 'nova-jovens' && path[1] === 'preparar' && request.method === 'POST') ||
      (path[0] === 'domingo' && ((request.method === 'GET' && !path[1]) || (request.method === 'POST' && path[1] === 'preparar')))
    )) return true;
    const permittedAction = (request.method === 'GET' && ['datas', 'dashboard', 'painel'].includes(path[1]))
      || (request.method === 'PATCH' && /^\d+$/.test(path[1] ?? ''));
    if (permittedAction && grantedRoles.includes(moduleRoles[path[0]])) return true;
    if (scoped) {
      throw new ForbiddenException('Perfil sem acesso a este modulo ou operacao.');
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.some((role) => grantedRoles.includes(role))) {
      return true;
    }

    throw new ForbiddenException('Perfil sem permissao para esta operacao.');
  }
}
