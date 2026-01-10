'use client';

/**
 * AuthForm component handles both login and signup modes using Supabase Auth.
 */

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2, Mail, Lock, User, CheckCircle } from 'lucide-react';

interface AuthFormProps {
    mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            name: name || email.split('@')[0],
                        },
                    },
                });

                if (error) throw error;
                setSuccess(true);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                // Get user profile to determine redirect
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', user.id)
                        .single();

                    if (profileError) {
                        console.error('Error fetching profile:', profileError);
                    }

                    const role = profile?.role;
                    const target = role === 'admin' ? '/admin/dashboard' : '/dashboard';

                    router.refresh();
                    router.push(target);
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (success && mode === 'signup') {
        return (
            <div className="text-center py-8 animate-fade-in">
                <div className="mx-auto w-14 h-14 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center mb-4 ring-1 ring-green-500/20">
                    <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-foreground">Check Your Email</h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    We&apos;ve sent you a confirmation link. Please check your email to complete signup.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-2xl font-bold text-center mb-2 text-foreground">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-center text-muted-foreground text-sm mb-8">
                {mode === 'login'
                    ? 'Sign in to continue your dance journey'
                    : 'Start tracking your dance progress today'}
            </p>

            {error && (
                <div className="flex items-start gap-3 bg-destructive/10 text-destructive p-3 rounded-lg text-sm mb-6 border border-destructive/20 animate-slide-down">
                    <div className="shrink-0 mt-0.5">⚠️</div>
                    <p>{error}</p>
                </div>
            )}

            {mode === 'signup' && (
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input
                            id="name"
                            type="text"
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                </label>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                        id="email"
                        type="email"
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                        id="password"
                        type="password"
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        minLength={6}
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Please wait...
                    </>
                ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                )}
            </button>
        </form>
    );
}
