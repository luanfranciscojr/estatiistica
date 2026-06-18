import { Request } from 'express';

export interface AuthenticatedUser {
  id: number;
  nome: string;
  login: string;
  roles: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  sessionToken?: string;
}
