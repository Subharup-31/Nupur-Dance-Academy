# Implementation Plan - UI/UX Overhaul

## Goal
Audit and fix all UI/UX issues to create a modern, clean, and professional interface using Next.js and Tailwind CSS.

## User Review Required
- **Design System**: I am moving away from custom CSS classes (`.card`, `.btn`) to pure Tailwind utility classes for better maintainability and consistency.
- **Color Palette**: I will standardize on `Slate` (50-900) for neutrals and strict `Black/White` for primary actions, keeping the "SaaS" aesthetic.

## Proposed Changes

### 1. Global Styles & Config
- **File**: `app/globals.css`
    - [DELETE] Remove custom component classes (`.app-shell`, `.app-sidebar`, `.card`, `.btn`, `.sausage-nav`).
    - [MODIFY] Keep and refine CSS variables for theme colors.
    - [MODIFY] Ensure standard Tailwind directives.
- **File**: `tailwind.config.ts`
    - [NEW] Add `colors` extension to map `background`, `foreground`, `card`, `border` to CSS variables.

### 2. Component Refactoring
- **File**: `components/Navbar.tsx`
    - [MODIFY] Replace undefined `.navbar` classes with Tailwind flex/grid layouts.
- **File**: `components/SausageNav.tsx`
    - [MODIFY] Refine shadow, blur, and spacing.
- **File**: `components/Sidebar.tsx`
    - [MODIFY] Improve mobile responsiveness and active state styling.
- **File**: `app/page.tsx` (Landing Page)
    - [MODIFY] Clean up background gradients and typography.

### 3. Dashboard Layouts
- **File**: `app/admin/dashboard/page.tsx`
    - [MODIFY] Ensure full-height layout without overflow issues. Refine the master-detail grid.
- **File**: `components/StudentList.tsx` & `components/EntryList.tsx`
    - [MODIFY] Standardize card styling (padding, borders, hover effects).

## Verification Plan
### Manual Verification
- **Build Check**: Run `npm run build` to ensure no CSS syntax errors.
- **Visual Check**:
    1. **Landing Page**: Verify background, spacing, and usage of `SausageNav`.
    2. **Admin Dashboard**: Verify sidebar layout, student list scrolling, and entry detail view.
    3. **Mobile View**: Check if the sidebar and lists stack correctly on small screens.
