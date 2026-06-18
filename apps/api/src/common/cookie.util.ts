import { parse } from 'cookie';

export function readCookie(rawCookieHeader: string | undefined, name: string) {
  if (!rawCookieHeader) {
    return undefined;
  }

  return parse(rawCookieHeader)[name];
}
