-- Supabase Schema for Vibe Wallpaper Platform
-- Run this in your Supabase SQL Editor

-- Create wallpapers table
CREATE TABLE wallpapers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('cyberpunk', 'minimal', 'anime', 'dark', 'nature', 'abstract')),
  type TEXT NOT NULL CHECK (type IN ('static', 'live')),
  tags TEXT[] DEFAULT '{}',
  thumbnail_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  video_url TEXT,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  file_size INTEGER,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Allow public read access" 
  ON wallpapers 
  FOR SELECT 
  USING (true);

-- Create policy for admin operations (requires authentication)
CREATE POLICY "Allow authenticated insert" 
  ON wallpapers 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" 
  ON wallpapers 
  FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated delete" 
  ON wallpapers 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Create storage bucket for wallpapers
-- Note: Run this in the Storage section of Supabase Dashboard
-- Bucket name: wallpapers
-- Public: true
-- Allowed MIME types: image/*, video/*

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_wallpapers_updated_at 
  BEFORE UPDATE ON wallpapers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_wallpapers_category ON wallpapers(category);
CREATE INDEX idx_wallpapers_type ON wallpapers(type);
CREATE INDEX idx_wallpapers_featured ON wallpapers(is_featured);
CREATE INDEX idx_wallpapers_created_at ON wallpapers(created_at DESC);

-- Enable realtime for wallpapers
ALTER PUBLICATION supabase_realtime ADD TABLE wallpapers;
