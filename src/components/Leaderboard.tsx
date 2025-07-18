'use client'

import { User } from '@/types'

interface LeaderboardProps {
  users: User[]
  currentRound?: number
}

export default function Leaderboard({ users, currentRound }: LeaderboardProps) {
  // Seřadíme uživatele podle bodů (sestupně)
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints)

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Tabulka bodování</h3>
        {currentRound && (
          <p className="text-sm text-gray-500">Po {currentRound}. kole</p>
        )}
      </div>
      
      <div className="divide-y divide-gray-200">
        {sortedUsers.map((user, index) => (
          <div key={user.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                  <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.nickname}</div>
                  <div className="text-sm text-gray-500">
                    Zůstatek: {user.balance.toLocaleString('cs-CZ')} Kč
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {user.totalPoints} bodů
                </div>
                <div className="text-sm text-gray-500">
                  {index === 0 && (
                    <span className="text-yellow-600 font-medium">🥇 Vůdce</span>
                  )}
                  {index === 1 && (
                    <span className="text-gray-600 font-medium">🥈 2. místo</span>
                  )}
                  {index === 2 && (
                    <span className="text-orange-600 font-medium">🥉 3. místo</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 