# Vibe Wallpaper Platform

A modern, production-level "Vibe Wallpaper" web platform focused on high-quality desktop transformation. Built with Next.js, Tailwind CSS, Framer Motion, and Supabase.

## Features

### User Website
- **Homepage**: Immersive hero section, featured wallpapers grid, category browsing, trending section
- **Explore Page**: Masonry/grid layout, filters (category, type, resolution), search functionality
- **Wallpaper Detail**: Full preview (image/video), tags, resolution info, download button, related wallpapers
- **Live Wallpaper Support**: Video wallpapers (MP4/WebM) with preview autoplay
- **Dark Theme**: Premium, cinematic aesthetic with glassmorphism and neon accents

### Admin Panel
- Secure login with basic authentication
- Upload image and video wallpapers
- Add metadata (title, category, tags, type)
- Upload to cloud storage (Supabase Storage)
- Manage existing wallpapers (view, delete)
- Dashboard with statistics

## Tech Stack

- **Next.js 14** - App Router, React Server Components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom design system
- **Framer Motion** - Smooth animations
- **Supabase** - Database and storage
- **Lucide React** - Icons

## Project Structure

```
├── app/
│   ├── admin/
│   │   ├── dashboard/     # Admin dashboard with upload & management
│   │   ├── layout.tsx      # Admin layout
│   │   └── page.tsx        # Admin login
│   ├── api/
│   │   ├── admin/login/    # Admin authentication
│   │   ├── upload/         # File upload endpoint
│   │   └── wallpapers/     # CRUD operations
│   ├── explore/            # Explore page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── wallpaper/
│       └── [id]/            # Wallpaper detail page
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── categories.tsx
│   ├── featured-wallpapers.tsx
│   ├── trending-section.tsx
│   ├── wallpaper-card.tsx
│   └── admin-navbar.tsx
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd vibe-wallpaper

# Install dependencies
npm install
```

### 2. Environment Setup

Create `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

### 3. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Create a `wallpapers` table:
3. password Vb,/s_GEd-8-h2E

```sql
create table wallpapers (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text not null,
  type text not null check (type in ('static', 'live')),
  tags text[] default '{}',
  thumbnail_url text not null,
  image_url text not null,
  video_url text,
  width integer not null,
  height integer not null,
  file_size integer,
  downloads integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  is_featured boolean default false
);

-- Enable RLS
alter table wallpapers enable row level security;

-- Create policies
CREATE POLICY "Allow public read" ON wallpapers FOR SELECT USING (true);
CREATE POLICY "Allow admin all" ON wallpapers FOR ALL USING (auth.role() = 'authenticated');
```

3. Create a `wallpapers` storage bucket with public access

### 4. Development

```bash
# Run development server
npm run dev
```

Open http://localhost:3000 for user site
Open http://localhost:3000/admin for admin panel

### 5. Build for Production

```bash
npm run build
```

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/vibe-wallpaper.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com and import your repository
2. Add environment variables from `.env.local` in Vercel Dashboard > Settings > Environment Variables
3. Deploy!

### 3. Environment Variables on Vercel

Add these in Vercel Dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## Design System

### Colors
- **Background**: `#0B0F19`
- **Surface**: `#111827`
- **Surface Light**: `#1F2937`
- **Accent Purple**: `#8B5CF6`
- **Accent Blue**: `#3B82F6`
- **Accent Cyan**: `#06B6D4`

### Typography
- **Font**: Inter (Google Fonts)
- **Gradient Text**: `bg-gradient-to-r from-purple-500 to-cyan-500`

### Effects
- **Glassmorphism**: `backdrop-blur-md bg-surface/70 border-white/10`
- **Glow**: `box-shadow: 0 0 20px rgba(139, 92, 246, 0.3)`

## API Endpoints

### Wallpapers
- `GET /api/wallpapers` - List all (with filters)
- `GET /api/wallpapers?id=xxx` - Get single wallpaper
- `POST /api/wallpapers` - Create new (admin only)
- `PATCH /api/wallpapers/[id]` - Update (admin only)
- `DELETE /api/wallpapers/[id]` - Delete (admin only)
- `POST /api/wallpapers/[id]/download` - Track download

### Upload
- `POST /api/upload` - Upload file to storage

### Admin
- `POST /api/admin/login` - Admin authentication

## Features Overview

| Feature | Status |
|---------|--------|
| Homepage | Complete |
| Explore Page | Complete |
| Wallpaper Detail | Complete |
| Live Wallpapers | Complete |
| Admin Panel | Complete |
| Upload System | Complete |
| Search & Filters | Complete |
| Dark Theme | Complete |
| Responsive Design | Complete |

## License

MIT License - feel free to use this for your own projects!

---

Built with by a senior full-stack developer for production use.
