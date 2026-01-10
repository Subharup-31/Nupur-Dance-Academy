'use client';

import { useState } from 'react';
import { submitEntry } from '@/lib/actions';
import { PenLine, CheckCircle2, Loader2, Send, Calendar } from 'lucide-react';

interface EntryFormProps {
    hasSubmittedToday: boolean;
}

export default function EntryForm({ hasSubmittedToday }: EntryFormProps) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Please write something about what you learned today');
            return;
        }

        setLoading(true);
        setError(null);

        const result = await submitEntry(content);

        if (result.error) {
            setError(result.error);
        } else {
            setSuccess(true);
            setContent('');
        }

        setLoading(false);
    };

    if (success || hasSubmittedToday) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Entry Submitted!</h3>
                <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                    You&apos;ve logged your learning for today. Great job keeping up the momentum!
                </p>
            </div>
        );
    }

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-border shrink-0">
                <h2 className="text-base font-semibold text-foreground flex items-center gap-2.5">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <PenLine className="w-4 h-4 text-primary" />
                    </div>
                    New Entry
                </h2>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-md">
                    <Calendar className="w-3.5 h-3.5" />
                    {today}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-5 overflow-hidden min-h-0">
                {error && (
                    <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20 animate-slide-down">
                        {error}
                    </div>
                )}

                <div className="mb-4 flex-1 flex flex-col min-h-0">
                    <label
                        htmlFor="entry-content"
                        className="block text-sm font-medium text-foreground mb-2"
                    >
                        What did you learn today?
                    </label>
                    <textarea
                        id="entry-content"
                        className="w-full flex-1 min-h-[180px] p-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all text-sm leading-relaxed scrollbar-thin"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="I learned to control my breathing during the waltz, focused on posture and timing..."
                        disabled={loading}
                    />
                </div>

                <div className="flex items-center justify-between shrink-0 pt-2">
                    <p className="text-xs text-muted-foreground">
                        {content.length > 0 ? `${content.length} characters` : 'Write a few sentences'}
                    </p>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        disabled={loading || !content.trim()}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Entry
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
