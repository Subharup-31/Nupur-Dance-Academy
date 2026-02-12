'use client';

import { ClassEntry } from '@/lib/types';
import { X, Calendar, FileText } from 'lucide-react';
import { useEffect } from 'react';

interface EntryDetailModalProps {
    entry: ClassEntry | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EntryDetailModal({ entry, isOpen, onClose }: EntryDetailModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !entry) return null;

    const formatFullDate = (dateString: string) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-2xl max-h-[85vh] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 px-6 py-4 border-b border-border bg-card/80 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl font-bold text-foreground mb-1">
                                    Learning Log
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={entry.entry_date}>
                                        {formatFullDate(entry.entry_date)}
                                    </time>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="shrink-0 p-2 rounded-lg hover:bg-secondary/80 transition-colors duration-150 group"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-120px)] scrollbar-thin">
                    <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {entry.content}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 px-6 py-4 border-t border-border bg-card/80 backdrop-blur-xl">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-150"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
