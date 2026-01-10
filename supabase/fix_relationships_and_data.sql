-- Fix relationships and missing data - V2 (Reordered)

-- 1. Backfill missing profiles for existing users FIRST
-- We must ensure profiles exist for all users referenced in class_entries BEFORE adding the constraint
INSERT INTO public.profiles (id, name, role)
SELECT 
  id, 
  COALESCE(raw_user_meta_data->>'name', email), 
  'student'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);

-- 2. Fix the Foreign Key relationship to allow joining class_entries with profiles
-- Drop the old constraint referencing auth.users directly
ALTER TABLE class_entries DROP CONSTRAINT IF EXISTS class_entries_student_id_fkey;

-- Add new constraint referencing profiles.id (which itself references auth.users)
-- This allows PostgREST to see the relationship between class_entries and profiles
ALTER TABLE class_entries
  ADD CONSTRAINT class_entries_student_id_fkey
  FOREIGN KEY (student_id)
  REFERENCES profiles(id)
  ON DELETE CASCADE;
