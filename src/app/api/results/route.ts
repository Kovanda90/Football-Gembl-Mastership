import { NextRequest, NextResponse } from 'next/server'
import { safeLoadData, safeSaveData } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const round = searchParams.get('round')
    
    if (!round) {
      return NextResponse.json({ error: 'Chybí round parametr' }, { status: 400 })
    }
    
    const key = `results${round}_2025_26`
    const data = await safeLoadData(key)
    
    if (data) {
      return NextResponse.json(JSON.parse(data))
    }
    
    return NextResponse.json([])
  } catch (error) {
    console.error('Chyba při načítání výsledků:', error)
    return NextResponse.json({ error: 'Chyba při načítání výsledků' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { round, results } = body
    
    if (!round || !results) {
      return NextResponse.json({ error: 'Chybí povinné parametry' }, { status: 400 })
    }
    
    const key = `results${round}_2025_26`
    await safeSaveData(key, JSON.stringify(results))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Chyba při ukládání výsledků:', error)
    return NextResponse.json({ error: 'Chyba při ukládání výsledků' }, { status: 500 })
  }
} 