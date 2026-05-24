import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Matcher ignoring next.js internals and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/(en|ur)/:path*']
};