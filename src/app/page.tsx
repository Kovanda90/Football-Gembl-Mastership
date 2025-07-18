'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const USERS = [
  { nickname: 'Rybča', password: 'rybca123' },
  { nickname: 'Kořda', password: 'korda123' },
  { nickname: 'Jozeve', password: 'jozeve123' },
  { nickname: 'Špinavovlas', password: 'spinavovlas123' },
  { nickname: 'Netáhlo', password: 'netahlo123' },
  { nickname: 'admin', password: 'admin123' }, // nový admin účet
]

export default function Home() {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = USERS.find(
      u => u.nickname.toLowerCase() === nickname.toLowerCase() && u.password === password
    )

    if (user) {
      // Pro jednoduchost použijeme localStorage, později přidáme Firebase Auth
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    } else {
      setError('Nesprávná přezdívka nebo heslo!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4 text-6xl leading-loose">
      <div className="bg-white rounded-xl shadow-2xl p-16 max-w-2xl mx-auto flex flex-col justify-center items-center border-8 border-white" style={{ minHeight: 'auto', width: 'auto' }}>
        <div className="text-center mb-28 leading-loose">
          <h1 className="text-8xl font-extrabold text-gray-800 mb-12 leading-loose">FGM</h1>
          <p className="text-6xl text-gray-600 mb-10 leading-loose">Football Gembl Mastership</p>
          <p className="text-5xl text-gray-500 leading-loose">Tipování české ligy pro partu</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-28 w-full flex flex-col items-center">
          <div className="w-[19rem] flex flex-col items-center mb-12">
            <label htmlFor="nickname" className="block text-6xl font-extrabold text-gray-700 mb-10 text-center leading-loose">
              Přezdívka
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-[19rem] px-12 py-16 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent text-6xl mx-auto text-center placeholder:text-6xl leading-relaxed"
              placeholder="Zadej přezdívku"
              required
            />
          </div>

          <div className="w-[19rem] flex flex-col items-center mb-12">
            <label htmlFor="password" className="block text-6xl font-extrabold text-gray-700 mb-10 text-center leading-loose">
              Heslo
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[19rem] px-12 py-16 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-transparent text-6xl mx-auto text-center placeholder:text-6xl leading-relaxed"
              placeholder="Zadej heslo"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-12 py-12 rounded-md text-5xl text-center mb-12 leading-loose">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-[19rem] bg-blue-600 text-white py-16 px-12 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-6xl font-extrabold mx-auto text-center mb-12 leading-loose"
          >
            Přihlásit se
          </button>
        </form>

        <div className="mt-24 text-center leading-loose">
          <p className="text-5xl text-gray-500">
            Dostupné účty: Rybča, Kořda, Jozeve, Špinavovlas, Netáhlo
          </p>
        </div>
      </div>
    </div>
  )
} 