import { NextRequest, NextResponse } from 'next/server'
import { safeLoadData } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const round = searchParams.get('round')
    
    if (!round) {
      return NextResponse.json({ error: 'Chybí round parametr' }, { status: 400 })
    }
    
    // Načteme tipy všech uživatelů
    const users = ['Rybča', 'Kořda', 'Jozeve', 'Špinavovlas', 'Netáhlo']
    const allTips: { [key: string]: any[] } = {}
    
    for (const user of users) {
      const key = `tips${round}_${user}`
      const data = await safeLoadData(key)
      
      if (data) {
        allTips[user] = JSON.parse(data)
      }
    }
    
    return NextResponse.json(allTips)
  } catch (error) {
    console.error('Chyba při načítání všech tipů:', error)
    return NextResponse.json({ error: 'Chyba při načítání všech tipů' }, { status: 500 })
  }
} 