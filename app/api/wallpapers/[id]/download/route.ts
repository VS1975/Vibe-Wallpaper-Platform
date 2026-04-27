import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Increment download count
    const { error } = await supabaseServer
      .from('wallpapers')
      .update({ 
        downloads: supabaseServer.rpc('increment', { x: 1 })
      })
      .eq('id', params.id)

    if (error) {
      console.error('Failed to increment download count:', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
