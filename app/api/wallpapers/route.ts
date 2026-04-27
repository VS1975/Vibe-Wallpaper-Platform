import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'
import type { Wallpaper, Category, WallpaperType } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category') as Category | null
    const type = searchParams.get('type') as WallpaperType | null
    const search = searchParams.get('search')
    const resolution = searchParams.get('resolution')
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')
    const exclude = searchParams.get('exclude')

    let query = supabaseServer
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (type && type !== 'all') {
      query = query.eq('type', type)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,tags.cs.{${search}}`)
    }

    if (featured) {
      query = query.eq('is_featured', true)
    }

    if (exclude) {
      query = query.neq('id', exclude)
    }

    // Resolution filter
    if (resolution && resolution !== 'all') {
      switch (resolution) {
        case '4k':
          query = query.gte('width', 3840)
          break
        case '1440p':
          query = query.gte('width', 2560).lt('width', 3840)
          break
        case '1080p':
          query = query.gte('width', 1920).lt('width', 2560)
          break
      }
    }

    const { data: wallpapers, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch wallpapers' },
        { status: 500 }
      )
    }

    return NextResponse.json({ wallpapers: wallpapers || [] })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data: wallpaper, error } = await supabaseServer
      .from('wallpapers')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create wallpaper' },
        { status: 500 }
      )
    }

    return NextResponse.json({ wallpaper }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
