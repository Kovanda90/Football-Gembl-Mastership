'use client'

import { useState, useEffect } from 'react'

interface LeaderboardEntry {
  nickname: string
  resultPoints: number
  scorerPoints: number
  bonusPoints: number
  totalPoints: number
}

interface ApiResponse {
  success: boolean
  data: {
    leaderboard: LeaderboardEntry[]
    rounds: Array<{
      roundNumber: number
      hasResults: boolean
    }>
  }
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [rounds, setRounds] = useState<Array<{roundNumber: number, hasResults: boolean}>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/results')
        const data: ApiResponse = await response.json()
        
        if (data.success) {
          setLeaderboard(data.data.leaderboard)
          setRounds(data.data.rounds)
        } else {
          setError('Chyba při načítání bodování')
        }
      } catch (err) {
        setError('Chyba při načítání bodování')
        console.error('Chyba při načítání bodování:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Načítání bodování...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌</div>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">FGM - Bodování</h1>
            <p className="text-gray-500">Aktuální stav bodování včetně bonusových bodů pro vítěze ve střelcích</p>
          </div>

          {/* Informace o kolech */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Stav kol:</h2>
            <div className="flex flex-wrap gap-2">
              {rounds.map((round) => (
                <div
                  key={round.roundNumber}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    round.hasResults
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {round.roundNumber}. kolo {round.hasResults ? '✓' : '○'}
                </div>
              ))}
            </div>
          </div>

          {/* Tabulka bodování */}
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-900">Pořadí</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-900">Hráč</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-900">Body za výsledek</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-900">Body za střelce</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-900">Bonusové body</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-900">Celkem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((entry, index) => (
                  <tr
                    key={entry.nickname}
                    className={`${
                      index === 0
                        ? 'bg-yellow-50 border-l-4 border-yellow-400'
                        : index === 1
                        ? 'bg-gray-50 border-l-4 border-gray-400'
                        : index === 2
                        ? 'bg-orange-50 border-l-4 border-orange-400'
                        : 'bg-white'
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? 'bg-yellow-400 text-white'
                            : index === 1
                            ? 'bg-gray-400 text-white'
                            : index === 2
                            ? 'bg-orange-400 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>
                        {index === 0 && <span className="ml-2 text-yellow-600">🥇</span>}
                        {index === 1 && <span className="ml-2 text-gray-600">🥈</span>}
                        {index === 2 && <span className="ml-2 text-orange-600">🥉</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{entry.nickname}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-blue-900">{entry.resultPoints}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-blue-900">{entry.scorerPoints}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`font-bold ${
                        entry.bonusPoints > 0 ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {entry.bonusPoints > 0 ? `+${entry.bonusPoints}` : entry.bonusPoints}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-lg text-gray-900">{entry.totalPoints}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vysvětlení bonusových bodů */}
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">ℹ️ Bonusové body</h3>
            <p className="text-green-700 text-sm">
              Vítěz ve střelcích v každém kole získává <strong>+1 bonusový bod</strong> do "bodů za výsledek". 
              Pokud je více hráčů se stejným počtem bodů za střelce, všichni získají bonusový bod.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>FGM - Football Gembl Mastership</p>
            <p>Poslední aktualizace: {new Date().toLocaleString('cs-CZ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 