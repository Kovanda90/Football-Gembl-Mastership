'use client'

import { useState } from 'react'
import { Match, Tip } from '@/types'

interface MatchCardProps {
  match: Match
  index: number
  tip?: Tip
  onTipChange: (index: number, result: { home: number; away: number }, scorer: string) => void
  tipsVisible: boolean
  disabled?: boolean
}

export default function MatchCard({
  match,
  index,
  tip,
  onTipChange,
  tipsVisible,
  disabled = false
}: MatchCardProps) {
  const [homeScore, setHomeScore] = useState(tip?.predictedResult.home?.toString() || '')
  const [awayScore, setAwayScore] = useState(tip?.predictedResult.away?.toString() || '')
  const [scorer, setScorer] = useState(tip?.predictedScorer || '')

  const handleScoreChange = (type: 'home' | 'away', value: string) => {
    const numValue = parseInt(value) || 0
    const otherScore = type === 'home' ? (parseInt(awayScore) || 0) : (parseInt(homeScore) || 0)
    
    if (type === 'home') {
      setHomeScore(value)
      onTipChange(index, { home: numValue, away: otherScore }, scorer)
    } else {
      setAwayScore(value)
      onTipChange(index, { home: otherScore, away: numValue }, scorer)
    }
  }

  const handleScorerChange = (value: string) => {
    setScorer(value)
    const home = parseInt(homeScore) || 0
    const away = parseInt(awayScore) || 0
    onTipChange(index, { home, away }, value)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{match.home}</div>
          <div className="text-sm text-gray-500">Domácí</div>
        </div>
        <div className="text-center mx-4">
          <div className="text-2xl font-bold text-blue-600">vs</div>
          <div className="text-xs text-gray-500">
            {new Date(match.kickoff).toLocaleString('cs-CZ', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        <div className="flex-1 text-right">
          <div className="font-semibold text-gray-900">{match.away}</div>
          <div className="text-sm text-gray-500">Hosté</div>
        </div>
      </div>

      {!tipsVisible && !disabled && (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="10"
                value={homeScore}
                onChange={(e) => handleScoreChange('home', e.target.value)}
                className="w-16 px-3 py-2 border border-gray-300 rounded text-center font-semibold"
                placeholder="0"
              />
              <span className="text-xl font-bold text-gray-500">:</span>
              <input
                type="number"
                min="0"
                max="10"
                value={awayScore}
                onChange={(e) => handleScoreChange('away', e.target.value)}
                className="w-16 px-3 py-2 border border-gray-300 rounded text-center font-semibold"
                placeholder="0"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Střelec:</label>
            <input
              type="text"
              value={scorer}
              onChange={(e) => handleScorerChange(e.target.value)}
              placeholder="Jméno střelce nebo prázdné pro 0:0"
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      )}

      {tipsVisible && tip && (
        <div className="bg-gray-50 rounded p-3">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Tvůj tip:</span>{' '}
            <span className="font-semibold">
              {tip.predictedResult.home}:{tip.predictedResult.away}
            </span>
            {tip.predictedScorer && (
              <span className="ml-2">
                ({tip.predictedScorer})
              </span>
            )}
          </div>
        </div>
      )}

      {match.result && (
        <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
          <div className="text-sm">
            <span className="font-medium text-green-800">Skutečný výsledek:</span>{' '}
            <span className="font-semibold text-green-900">
              {match.result.home}:{match.result.away}
            </span>
            {match.scorers && match.scorers.length > 0 && (
              <div className="text-xs text-green-700 mt-1">
                Střelci: {match.scorers.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 