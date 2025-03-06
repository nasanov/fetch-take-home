import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	const isAuth = req.cookies.has('fetch-access-token');

	if (!isAuth && req.nextUrl.pathname !== '/login') {
		return NextResponse.redirect(new URL('/login', req.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/search', '/'],
};
