"use client"

import { useState } from 'react'
import Link from 'next/link'
import { hiragana } from '@/data/hiragana'

type Phase = 'learn' | 'pronounce' | 'quiz' | 'result'

const examples: Record<string, { word: string; meaning: string }> = {
  'あ': { word: 'あおい (aoi)', meaning: 'blue' },
  'い': { word: 'いぬ (inu)', meaning: 'dog' },
  'う': { word: 'うみ (umi)', meaning: 'sea' },
  'え': { word: 'えき (eki)', meaning: 'station' },
  'お': { word: 'おかね (okane)', meaning: 'money' },
  'か': { word: 'かさ (kasa)', meaning: 'umbrella' },
  'き': { word: 'きのこ (kinoko)', meaning: 'mushroom' },
  'く': { word: 'くも (kumo)', meaning: 'cloud' },
  'け': { word: 'けいたい (keitai)', meaning: 'phone' },
  'こ': { word: 'こども (kodomo)', meaning: 'child' },
}

const QUIZ_COUNT = 10

export default function HiraganaPage() {
  const [phase, setPhase] = useState<Phase>('learn')
  const [selected, setSelected] = useState(hiragana[0])
  const [quizItems] = useState(() => [...hiragana].sort(() => Math.random() - 0.5).slice(0, QUIZ_COUNT))
  const [quizIndex, setQuizIndex] = useState(0)
  const [choices, setChoices] = useState(() => makeChoices(0, [...hiragana].sort(() => Math.random() - 0.5).slice(0, QUIZ_COUNT)))
  const [answered, setAnswered] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  function makeChoices(idx: number, items: typeof hiragana) {
    const correct = items[idx]
    const wrong = hiragana.filter(h => h.roman !== correct.roman)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(h => h.roman)
    return [...wrong, correct.roman].sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (c: string) => {
    if (answered) return
    setAnswered(c)
    if (c === quizItems[quizIndex].roman) setScore(s => s + 1)
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
        {/* Header */}
        <div className="pt-10 pb-6 flex items-center gap-4">
          <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-black text-slate-900">Hiragana <span className="text-slate-300">ひらがな</span></h1>
          </div>
        </div>

        {/* Step tabs */}
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
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6">Step 1 · Learn</p>
            <div className="grid grid-cols-5 gap-2 mb-8">
              {hiragana.map(h => (
                <button key={h.char} onClick={() => setSelected(h)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${
                    selected.char === h.char ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}>
                  <span className="text-xl font-bold">{h.char}</span>
                  <span className={`text-[9px] mt-0.5 ${selected.char === h.char ? 'text-slate-400' : 'text-slate-400'}`}>{h.roman}</span>
                </button>
              ))}
            </div>

            {/* Selected card */}
            <div className="bg-slate-950 rounded-3xl p-6 mb-6 text-white">
              <div className="flex items-center gap-6">
                <span className="text-8xl font-bold">{selected.char}</span>
                <div>
                  <p className="text-3xl font-bold text-white">{selected.roman}</p>
                  {examples[selected.char] && (
                    <div className="mt-2">
                      <p className="text-white/60 text-sm">Example</p>
                      <p className="text-white font-medium">{examples[selected.char].word}</p>
                      <p className="text-white/40 text-sm">"{examples[selected.char].meaning}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button onClick={() => setPhase('pronounce')}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl text-base">
              Next: Pronunciation →
            </button>
          </div>
        )}

        {/* PRONOUNCE */}
        {phase === 'pronounce' && (
          <div>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6">Step 2 · Pronunciation</p>
            <p className="text-slate-500 text-sm mb-6">Each hiragana has one fixed sound. Tap each row to practice.</p>

            {['あいうえお','かきくけこ','さしすせそ','たちつてと','なにぬねの','はひふへほ','まみむめも','やゆよ','らりるれろ','わをん'].map((row) => (
              <div key={row} className="mb-4">
                <div className="flex gap-2">
                  {row.split('').map(char => {
                    const h = hiragana.find(x => x.char === char)
                    if (!h) return null
                    return (
                      <div key={char} className="flex-1 bg-slate-50 rounded-2xl py-3 flex flex-col items-center gap-1">
                        <span className="text-2xl font-bold text-slate-900">{h.char}</span>
                        <span className="text-xs text-slate-400 font-medium">{h.roman}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="flex gap-3 mt-6 mb-8">
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

            <p className="text-slate-400 text-sm text-center mb-3">What is the reading?</p>
            <div className="bg-slate-950 rounded-3xl flex items-center justify-center mb-8" style={{ height: 180 }}>
              <span className="text-9xl text-white font-bold">{quizItems[quizIndex].char}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {choices.map(c => (
                <button key={c} onClick={() => handleAnswer(c)} disabled={!!answered}
                  className={`py-5 rounded-2xl text-xl font-bold transition-all ${
                    !answered ? 'bg-slate-50 text-slate-900 active:scale-95' :
                    c === quizItems[quizIndex].roman ? 'bg-emerald-500 text-white' :
                    c === answered ? 'bg-red-400 text-white' : 'bg-slate-50 text-slate-300'
                  }`}>
                  {c}
                </button>
              ))}
            </div>

            {answered && (
              <button onClick={nextQuiz} className="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold text-base">
                {quizIndex + 1 >= QUIZ_COUNT ? 'See Results' : 'Next →'}
              </button>
            )}
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div className="pt-8 pb-16 text-center">
            <p className="text-7xl mb-6">{score >= 8 ? '🏆' : score >= 5 ? '👍' : '💪'}</p>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">Quiz Complete</p>
            <p className="text-6xl font-black text-slate-900 mb-1">{score}<span className="text-3xl text-slate-300"> / {QUIZ_COUNT}</span></p>
            <p className="text-slate-400 mt-2 mb-10">
              {score >= 8 ? 'Excellent! You know your hiragana.' : score >= 5 ? 'Good job! Keep practicing.' : 'Keep going, you\'re learning!'}
            </p>
            <div className="flex gap-3">
              <button onClick={() => { setQuizIndex(0); setAnswered(null); setScore(0); setPhase('quiz') }}
                className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl">
                Retry Quiz
              </button>
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
