import { Tip, Match, PointsCalculation } from '@/types'

export function calculatePoints(
  tip: Tip,
  result: { home: number; away: number },
  scorers: string[]
): PointsCalculation {
  let points: PointsCalculation = {
    exactResult: 0,
    correctWinnerAndDifference: 0,
    correctWinner: 0,
    correctDraw: 0,
    correctScorer: 0,
    noScorer: 0,
    bonusPoints: 0,
    total: 0
  }

  // Přesný výsledek: 3 body
  if (tip.predictedResult.home === result.home && tip.predictedResult.away === result.away) {
    points.exactResult = 3
  }
  // Správný vítěz + správný rozdíl skóre: 2 body
  else if (
    (tip.predictedResult.home - tip.predictedResult.away === result.home - result.away) &&
    ((tip.predictedResult.home > tip.predictedResult.away && result.home > result.away) ||
     (tip.predictedResult.home < tip.predictedResult.away && result.home < result.away))
  ) {
    points.correctWinnerAndDifference = 2
  }
  // Pouze správný vítěz: 1 bod
  else if (
    (tip.predictedResult.home > tip.predictedResult.away && result.home > result.away) ||
    (tip.predictedResult.home < tip.predictedResult.away && result.home < result.away)
  ) {
    points.correctWinner = 1
  }
  // Správně tipnutá remíza (špatné skóre): 2 body
  else if (tip.predictedResult.home === tip.predictedResult.away && result.home === result.away) {
    points.correctDraw = 2
  }

  // Střelec
  if (tip.predictedScorer && tip.predictedScorer.trim() !== '') {
    if (scorers.includes(tip.predictedScorer)) {
      // 1 bod za každý gól
      const scorerGoals = scorers.filter(s => s === tip.predictedScorer).length
      points.correctScorer = scorerGoals
      
      // Hattrick bonus (3+ góly)
      if (scorerGoals >= 3) {
        points.bonusPoints += 2 // Zvláštní finanční bonus
      }
    }
  } else {
    // Nikdo nedá gól (a trefíš to): 2 body
    if (result.home === 0 && result.away === 0) {
      points.noScorer = 2
    }
  }

  // Celkový součet
  points.total = points.exactResult + 
                points.correctWinnerAndDifference + 
                points.correctWinner + 
                points.correctDraw + 
                points.correctScorer + 
                points.noScorer + 
                points.bonusPoints

  return points
}

export function calculateRoundPoints(tips: Tip[], matches: Match[]): number {
  let totalPoints = 0

  tips.forEach((tip, index) => {
    const match = matches[index]
    if (match.result && match.scorers) {
      const points = calculatePoints(tip, match.result, match.scorers)
      totalPoints += points.total
    }
  })

  return totalPoints
}

export function getWinnerBonus(tips: Tip[], matches: Match[]): number {
  // Bonus za trefení všech 1X2 výsledků v kole: 4 000 Kč
  let correctResults = 0
  let totalMatches = 0

  tips.forEach((tip, index) => {
    const match = matches[index]
    if (match.result) {
      totalMatches++
      const tipWinner = tip.predictedResult.home > tip.predictedResult.away ? 'home' :
                       tip.predictedResult.home < tip.predictedResult.away ? 'away' : 'draw'
      const actualWinner = match.result.home > match.result.away ? 'home' :
                          match.result.home < match.result.away ? 'away' : 'draw'
      
      if (tipWinner === actualWinner) {
        correctResults++
      }
    }
  })

  return correctResults === totalMatches ? 4000 : 0
}

export function getExactScoreBonus(tips: Tip[], matches: Match[]): number {
  // Bonus za trefení všech přesných skóre v kole: 10 000 Kč
  let exactScores = 0
  let totalMatches = 0

  tips.forEach((tip, index) => {
    const match = matches[index]
    if (match.result) {
      totalMatches++
      if (tip.predictedResult.home === match.result.home && 
          tip.predictedResult.away === match.result.away) {
        exactScores++
      }
    }
  })

  return exactScores === totalMatches ? 10000 : 0
} 