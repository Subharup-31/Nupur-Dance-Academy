import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    const { supabaseResponse, user, supabase } = await updateSession(request);

    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/signup', '/auth/callback'];
    const isPublicRoute = publicRoutes.some(route => pathname === route);

    // If user is not authenticated and trying to access protected route
    if (!user && !isPublicRoute) {
        const redirectUrl = new URL('/login', request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // If user is authenticated, check role for admin routes
    if (user && pathname.startsWith('/admin')) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin') {
            // Redirect non-admin users to student dashboard
            const redirectUrl = new URL('/dashboard', request.url);
            return NextResponse.redirect(redirectUrl);
        }
    }

    // If authenticated user is on login/signup, redirect based on role
    if (user && (pathname === '/login' || pathname === '/signup')) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        const redirectUrl = new URL(
            profile?.role === 'admin' ? '/admin/dashboard' : '/dashboard',
            request.url
        );
        return NextResponse.redirect(redirectUrl);
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
