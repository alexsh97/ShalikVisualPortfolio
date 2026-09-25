import { NextRequest, NextResponse } from 'next/server';
export function middleware(request:NextRequest){
 const headers=new Headers(request.headers);
 headers.set('x-site-pathname', request.nextUrl.pathname);
 headers.set('x-site-language',request.nextUrl.pathname==='/pl'||request.nextUrl.pathname.startsWith('/pl/')?'pl':'en');
 return NextResponse.next({request:{headers}});
}
export const config={matcher:['/((?!media|fonts|favicon|_next|__debug).*)']};
