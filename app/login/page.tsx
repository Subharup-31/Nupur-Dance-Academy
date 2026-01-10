import AuthForm from '@/components/AuthForm';
import Link from 'next/link';
import SausageNav from '@/components/SausageNav';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-6 bg-background relative overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern"></div>

            {/* Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <SausageNav />

            {/* Content */}
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 relative z-10 mt-20 md:mt-0 animate-slide-up">
                <AuthForm mode="login" />
                <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-foreground font-semibold hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
