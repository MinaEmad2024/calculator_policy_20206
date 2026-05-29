// proxy.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';

// export default NextAuth(authConfig).auth;

// // 1. Initialize NextAuth with your configuration
// const { auth } = NextAuth(authConfig);

// // 2. Wrap the NextAuth handler to execute your custom redirect logic first
// export const proxy = auth((request) => {
//   const { pathname } = request.nextUrl;

//   // 🛠️ Step A: Execute your custom dashboard policy redirects
//   if (pathname === '/dashboard/policy' || pathname === '/dashboard/policy_detail') {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   // 🔒 Step B: Fall back to NextAuth's internal routing/protection flow
//   return NextResponse.next();
// });

// // 3. Combine both matchers into one configuration array
// export const config = {
//   // Matches all routes except api, static files, and media assets,
//   // while ensuring dashboard paths are actively caught for your redirects
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };


import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};


