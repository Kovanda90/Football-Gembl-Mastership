export interface User {
  id: string
  nickname: string
  password: string
  role: 'player' | 'admin'
  balance: number
  totalPoints: number
}

export interface Match {
  id: string
  home: string
  away: string
  kickoff: string
  result?: { home: number; away: number }
  scorers?: string[]
}

export interface Tip {
  matchIndex: number
  predictedResult: { home: number; away: number }
  predictedScorer: string
}

export interface Round {
  id: string
  number: number
  startTime: string
  matches: Match[]
  tipsVisible: boolean
  locked: boolean
}

export interface UserTips {
  userId: string
  roundId: string
  tips: Tip[]
  submittedAt: string
  locked: boolean
}

export interface Bet {
  id: string
  type: 'round' | 'scorer' | 'overall'
  userId: string
  amount: number
  roundId?: string
  matchIndex?: number
  status: 'pending' | 'won' | 'lost'
}

export interface PointsCalculation {
  exactResult: number // 3 body
  correctWinnerAndDifference: number // 2 body
  correctWinner: number // 1 bod
  correctDraw: number // 2 body (špatné skóre)
  correctScorer: number // 1 bod za gól
  noScorer: number // 2 body
  bonusPoints: number // bonusové body
  total: number
} 