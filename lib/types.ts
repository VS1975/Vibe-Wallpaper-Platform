export type WallpaperType = 'static' | 'live'

export type Category = 'cyberpunk' | 'minimal' | 'anime' | 'dark' | 'nature' | 'abstract'

export interface Wallpaper {
  id: string
  title: string
  description?: string
  category: Category
  type: WallpaperType
  tags: string[]
  thumbnail_url: string
  image_url: string
  video_url?: string
  width: number
  height: number
  file_size?: number
  downloads: number
  created_at: string
  updated_at: string
  is_featured: boolean
}

export interface WallpaperFilters {
  category?: Category | 'all'
  type?: WallpaperType | 'all'
  resolution?: string
  search?: string
}

export interface AdminCredentials {
  username: string
  password: string
}
