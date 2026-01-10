'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Profile, ClassEntry, ClassEntryWithStudent } from './types';

// Helper: Get Authenticated User
async function getAuthenticatedUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { user: null, supabase, error: 'Not authenticated' };
    }

    return { user, supabase, error: null };
}

// Helper: Get Admin User
async function getAdminUser() {
    const { user, supabase, error } = await getAuthenticatedUser();

    if (error || !user) {
        return { user: null, supabase, error: 'Not authenticated' };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { user: null, supabase, error: 'Unauthorized: Admin access required' };
    }

    return { user, supabase, error: null };
}

// Student Actions

/**
 * Submits a new class entry for the current student.
 * @param content The learning log content.
 * @returns Object with success/error status.
 */
export async function submitEntry(content: string): Promise<{ error?: string; success?: boolean }> {
    const { user, supabase, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return { error: authError || 'Not authenticated' };

    const { error } = await supabase
        .from('class_entries')
        .insert({
            student_id: user.id,
            content,
            entry_date: new Date().toISOString().split('T')[0],
        });

    if (error) {
        if (error.code === '23505') {
            return { error: 'You have already submitted an entry for today' };
        }
        return { error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
}

/**
 * Fetches all class entries for the currently authenticated student.
 * @returns List of entries or error.
 */
export async function getMyEntries(): Promise<{ entries: ClassEntry[]; error: string | null }> {
    const { user, supabase, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return { entries: [], error: authError || 'Not authenticated' };

    const { data: entries, error } = await supabase
        .from('class_entries')
        .select('*')
        .eq('student_id', user.id)
        .order('entry_date', { ascending: false });

    if (error) {
        return { entries: [], error: error.message };
    }

    return { entries: (entries || []) as ClassEntry[], error: null };
}

/**
 * Checks if the student has already submitted an entry for today.
 * @returns Today's entry or null.
 */
export async function getTodayEntry(): Promise<{ entry: ClassEntry | null; error: string | null }> {
    const { user, supabase, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return { entry: null, error: authError || 'Not authenticated' };

    const today = new Date().toISOString().split('T')[0];

    const { data: entry, error } = await supabase
        .from('class_entries')
        .select('*')
        .eq('student_id', user.id)
        .eq('entry_date', today)
        .single();

    if (error && error.code !== 'PGRST116') {
        return { entry: null, error: error.message };
    }

    return { entry: (entry as ClassEntry) || null, error: null };
}

/**
 * Retrieves the profile information for the current user.
 * @returns User profile or error.
 */
export async function getProfile(): Promise<{ profile: Profile | null; error: string | null }> {
    const { user, supabase, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return { profile: null, error: authError || 'Not authenticated' };

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        return { profile: null, error: error.message };
    }

    return { profile: profile as Profile, error: null };
}

export async function signOut(): Promise<void> {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
}

// Admin Actions

/**
 * Admin Action: Fetches all student profiles.
 * @returns List of student profiles.
 */
export async function getAllStudents(): Promise<{ students: Profile[]; error: string | null }> {
    const { supabase, error: authError } = await getAdminUser();
    if (authError) return { students: [], error: authError };

    const { data: students, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('name');

    if (error) {
        return { students: [], error: error.message };
    }

    return { students: (students || []) as Profile[], error: null };
}

export async function getAllEntries(): Promise<{ entries: ClassEntryWithStudent[]; error: string | null }> {
    const { supabase, error: authError } = await getAdminUser();
    if (authError) return { entries: [], error: authError };

    const { data: entries, error } = await supabase
        .from('class_entries')
        .select(`
      *,
      profiles (name)
    `)
        .order('entry_date', { ascending: false });

    if (error) {
        return { entries: [], error: error.message };
    }

    return { entries: (entries || []) as unknown as ClassEntryWithStudent[], error: null };
}

export async function getStudentEntries(studentId: string): Promise<{ entries: ClassEntry[]; error: string | null }> {
    const { supabase, error: authError } = await getAdminUser();
    if (authError) return { entries: [], error: authError };

    const { data: entries, error } = await supabase
        .from('class_entries')
        .select('*')
        .eq('student_id', studentId)
        .order('entry_date', { ascending: false });

    if (error) {
        return { entries: [], error: error.message };
    }

    return { entries: (entries || []) as ClassEntry[], error: null };
}
