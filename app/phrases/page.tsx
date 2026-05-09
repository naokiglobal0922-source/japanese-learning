"use client"

import { useState } from 'react'
import Link from 'next/link'
import { phrases, phraseCategories } from '@/data/phrases'

type Phase = 'learn' | 'pronounce' | 'quiz' | 'result'

const QUIZ_COUNT = 6

export default function PhrasesPage() {
  const [phase, setPhase] = useState<Phase>('learn')
  const [activeCategory, setActiveCategory] = useState(phraseCategories[0])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [quizItems] = useState(() => [...phrases].sort(() => Math.random() - 0.5).slice(0, QUIZ_COUNT))
  const [quizIndex, setQuizIndex] = useState(0)
  const [choices, setChoices] = useState(() => makeChoices(0, [...phrases].sort(() => Math.random() - 0.5).slice(0, QUIZ_COUNT)))
  const [answered, setAnswered] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  function makeChoices(idx: number, items: typeof phrases) {
    const correct = items[idx]
    const wrong = phrases.filter(p => p.english !== correct.english)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(p => p.english)
    return [...wrong, correct.english].sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (c: string) => {
    if (answered) return
    setAnswered(c)
    if (c === quizItems[quizIndex].english) setScore(s => s + 1)
  }

  const nextQuiz = () => {
    const next = quizIndex + 1
    if (next >= QUIZ_COUNT) { setPhase('result'); return }
    setQuizIndex(next)
    setChoices(makeChoices(next, quizItems))
    setAnswered(null)
  }

  const steps: Phase[] = ['learn', 'pronounce', 'quiz']

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-5">
        <div className="pt-10 pb-6 flex items-center gap-4">
          <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <h1 className="text-xl font-black text-slate-900">Phrases <span className="text-slate-300">フレーズ</span></h1>
        </div>

        {phase !== 'result' && (
          <div className="flex gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-all ${
                phase === s ? 'bg-slate-900' : steps.indexOf(phase) > i ? 'bg-slate-300' : 'bg-slate-100'
              }`} />
            ))}
          </div>
        )}

        {/* LEARN */}
        {phase === 'learn' && (
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-5">Step 1 · Learn</p>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
              {phraseCategories.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setExpanded(null) }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-2 mb-8">
              {phrases.filter(p => p.category === activeCategory).map(phrase => (
                <button key={phrase.japanese} onClick={() => setExpanded(expanded === phrase.japanese ? null : phrase.japanese)}
                  className="w-full text-left">
                  <div className={`rounded-2xl px-5 py-4 transition-all ${
                    expanded === phrase.japanese ? 'bg-slate-950' : 'bg-slate-50'
                  }`}>
                    <p className={`font-bold text-base ${expanded === phrase.japanese ? 'text-white' : 'text-slate-900'}`}>
                      {phrase.japanese}
                    </p>
                    {expanded === phrase.japanese ? (
                      <div className="mt-2 space-y-1">
                        <p className="text-slate-400 text-sm">{phrase.reading}</p>
                        <p className="text-white font-semibold text-sm">{phrase.english}</p>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-sm mt-0.5 truncate">{phrase.english}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button onClick={() => setPhase('pronounce')}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl">
              Next: Pronunciation →
            </button>
          </div>
        )}

        {/* PRONOUNCE */}
        {phase === 'pronounce' && (
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-5">Step 2 · Pronunciation</p>
            <p className="text-slate-500 text-sm mb-6">Learn how each phrase sounds before the quiz.</p>

            <div className="space-y-3 mb-8">
              {phrases.map(phrase => (
                <div key={phrase.japanese} className="bg-slate-50 rounded-2xl px-5 py-4">
                  <p className="font-bold text-slate-900">{phrase.japanese}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{phrase.reading}</p>
                  <p className="text-slate-600 text-sm font-medium mt-1">{phrase.english}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={() => setPhase('learn')}
                className="flex-1 border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-2xl">
                ← Back
              </button>
              <button onClick={() => setPhase('quiz')}
                className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl">
                Start Quiz →
              </button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {phase === 'quiz' && (
          <div className="pb-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Step 3 · Quiz</p>
              <span className="text-sm font-bold text-slate-500">{quizIndex + 1} / {QUIZ_COUNT}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1 mb-8">
              <div className="bg-slate-900 h-1 rounded-full transition-all" style={{ width: `${((quizIndex + 1) / QUIZ_COUNT) * 100}%` }} />
            </div>

            <p className="text-slate-400 text-sm text-center mb-3">What does this phrase mean?</p>
            <div className="bg-slate-950 rounded-3xl flex flex-col items-center justify-center mb-8 py-10 px-6">
              <span className="text-2xl font-black text-white text-center leading-snug">{quizItems[quizIndex].japanese}</span>
              <span className="text-slate-500 text-sm mt-3 text-center">{quizItems[quizIndex].reading}</span>
            </div>

            <div className="space-y-2">
              {choices.map(c => (
                <button key={c} onClick={() => handleAnswer(c)} disabled={!!answered}
                  className={`w-full py-4 rounded-2xl text-sm font-bold text-left px-5 transition-all ${
                    !answered ? 'bg-slate-50 text-slate-900 active:scale-[0.99]' :
                    c === quizItems[quizIndex].english ? 'bg-emerald-500 text-white' :
                    c === answered ? 'bg-red-400 text-white' : 'bg-slate-50 text-slate-300'
                  }`}>
                  {c}
                </button>
              ))}
            </div>

            {answered && (
              <button onClick={nextQuiz} className="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold">
                {quizIndex + 1 >= QUIZ_COUNT ? 'See Results' : 'Next →'}
              </button>
            )}
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div className="pt-8 pb-16 text-center">
            <p className="text-7xl mb-6">{score >= 5 ? '🏆' : score >= 3 ? '👍' : '💪'}</p>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Quiz Complete</p>
            <p className="text-6xl font-black text-slate-900 mb-1">{score}<span className="text-3xl text-slate-300"> / {QUIZ_COUNT}</span></p>
            <p className="text-slate-400 mt-2 mb-10">
              {score >= 5 ? 'You can handle real conversations!' : 'Keep practicing these phrases!'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setQuizIndex(0); setAnswered(null); setScore(0); setPhase('quiz') }}
                className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl">Retry</button>
              <Link href="/" className="flex-1 border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center">
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
