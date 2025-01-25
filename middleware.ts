import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that don't require authentication
const publicPaths = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;
    const path = request.nextUrl.pathname;

    // If the user is not logged in and trying to access a protected route
    if (!token && !publicPaths.includes(path)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // If the user is logged in and trying to access auth pages
    if (token && publicPaths.includes(path)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If the user is logged in and accessing the root path
    if (token && path === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*', '/auth/:path*']
}; 