import { NextRequest, NextResponse } from 'next/server'
import { safeLoadData, safeSaveData } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user = searchParams.get('user')
    const round = searchParams.get('round')
    
    if (!user || !round) {
      return NextResponse.json({ error: 'Chybí user nebo round parametr' }, { status: 400 })
    }
    
    const key = `tips${round}_${user}`
    const data = await safeLoadData(key)
    
    if (data) {
      return NextResponse.json(JSON.parse(data))
    }
    
    return NextResponse.json([])
  } catch (error) {
    console.error('Chyba při načítání tipů:', error)
    return NextResponse.json({ error: 'Chyba při načítání tipů' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, round, tips } = body
    
    if (!user || !round || !tips) {
      return NextResponse.json({ error: 'Chybí povinné parametry' }, { status: 400 })
    }
    
    const key = `tips${round}_${user}`
    await safeSaveData(key, JSON.stringify(tips))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Chyba při ukládání tipů:', error)
    return NextResponse.json({ error: 'Chyba při ukládání tipů' }, { status: 500 })
  }
} 