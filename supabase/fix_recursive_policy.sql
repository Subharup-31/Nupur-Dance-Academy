-- Fix infinite recursion in RLS policies by using a SECURITY DEFINER function

-- 1. Create a secure function to check admin status
-- We use SECURITY DEFINER to bypass RLS on the profiles table when checking the role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Drop the recursive policies
DROP POLICY IF EXISTS "Admin can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admin can read all entries" ON class_entries;

-- 3. Re-create policies using the secure function
CREATE POLICY "Admin can read all profiles"
  ON profiles FOR SELECT
  USING (
    is_admin()
  );

CREATE POLICY "Admin can read all entries"
  ON class_entries FOR SELECT
  USING (
    is_admin()
  );
