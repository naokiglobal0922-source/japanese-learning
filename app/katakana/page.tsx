"use client"

import { useState } from 'react'
import Link from 'next/link'
import { katakana } from '@/data/katakana'

export default function KatakanaPage() {
  const [selected, setSelected] = useState<{ char: string; roman: string } | null>(null)
  const [quizMode, setQuizMode] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [choices, setChoices] = useState<string[]>([])
  const [answered, setAnswered] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const startQuiz = () => {
    setQuizIndex(0); setScore(0); setAnswered(null); setFinished(false); setQuizMode(true)
    makeChoices(0)
  }

  const makeChoices = (idx: number) => {
    const correct = katakana[idx]
    const others = katakana.filter(h => h.roman !== correct.roman)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(h => h.roman)
    setChoices([...others, correct.roman].sort(() => Math.random() - 0.5))
  }

  const handleAnswer = (choice: string) => {
    if (answered) return
    setAnswered(choice)
    if (choice === katakana[quizIndex].roman) setScore(s => s + 1)
  }

  const next = () => {
    const nextIdx = quizIndex + 1
    if (nextIdx >= katakana.length) { setFinished(true); return }
    setQuizIndex(nextIdx); setAnswered(null); makeChoices(nextIdx)
  }

  if (quizMode) {
    if (finished) return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-6xl mb-4">🎉</p>
          <p className="text-2xl font-bold text-slate-900 mb-1">Quiz Complete!</p>
          <p className="text-4xl font-bold text-blue-600 my-4">{score} / {katakana.length}</p>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={startQuiz} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold">Retry</button>
            <button onClick={() => setQuizMode(false)} className="px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 rounded-2xl font-semibold">Back</button>
          </div>
        </div>
      </div>
    )

    const current = katakana[quizIndex]
    return (
      <div className="min-h-screen bg-blue-50 pb-8">
        <div className="max-w-sm mx-auto px-4 pt-10">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setQuizMode(false)} className="text-blue-600 font-medium text-sm">← Back</button>
            <span className="text-sm text-slate-500">{quizIndex + 1} / {katakana.length}</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-1.5 mb-8">
            <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${((quizIndex + 1) / katakana.length) * 100}%` }} />
          </div>
          <p className="text-xs text-blue-400 text-center mb-2 font-medium uppercase tracking-wide">What is the reading?</p>
          <div className="bg-white rounded-3xl border-2 border-blue-200 flex items-center justify-center mb-8" style={{ height: 160 }}>
            <span className="text-8xl">{current.char}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {choices.map(c => (
              <button key={c} onClick={() => handleAnswer(c)} disabled={!!answered}
                className={`py-4 rounded-2xl text-lg font-bold border-2 transition-all ${
                  !answered ? 'bg-white border-blue-200 text-slate-700 active:scale-95' :
                  c === current.roman ? 'bg-emerald-500 border-emerald-500 text-white' :
                  c === answered ? 'bg-red-400 border-red-400 text-white' :
                  'bg-white border-slate-200 text-slate-400'
                }`}>
                {c}
              </button>
            ))}
          </div>
          {answered && (
            <button onClick={next} className="w-full mt-4 py-4 bg-blue-600 text-white rounded-2xl font-semibold text-lg">
              {quizIndex + 1 >= katakana.length ? 'See Results' : 'Next →'}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="pt-10 pb-6 flex items-center gap-3">
          <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Katakana</h1>
            <p className="text-sm text-slate-400">Tap a character to see its reading</p>
          </div>
        </div>

        <button onClick={startQuiz} className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-2xl mb-6 text-sm">
          Start Quiz ✏️
        </button>

        <div className="grid grid-cols-5 gap-2">
          {katakana.map((k) => (
            <button key={k.char} onClick={() => setSelected(selected?.char === k.char ? null : k)}
              className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                selected?.char === k.char ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
              <span className="text-2xl">{k.char}</span>
              <span className={`text-[10px] mt-0.5 font-medium ${selected?.char === k.char ? 'text-blue-100' : 'text-slate-400'}`}>{k.roman}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto bg-blue-600 text-white rounded-3xl p-5 flex items-center gap-4 shadow-xl">
            <span className="text-6xl">{selected.char}</span>
            <div>
              <p className="text-2xl font-bold">{selected.roman}</p>
              <p className="text-blue-200 text-sm mt-0.5">Tap the card to close</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
