"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { vocabulary } from '@/data/vocabulary'
import { hiragana } from '@/data/hiragana'

type QuizType = 'vocabulary' | 'hiragana'
type Question = { question: string; answer: string; choices: string[]; hint: string }

function makeVocabQuestions(): Question[] {
  const shuffled = [...vocabulary].sort(() => Math.random() - 0.5).slice(0, 10)
  return shuffled.map(word => {
    const others = vocabulary.filter(w => w.english !== word.english)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.english)
    return {
      question: word.japanese,
      answer: word.english,
      hint: word.reading,
      choices: [...others, word.english].sort(() => Math.random() - 0.5),
    }
  })
}

function makeHiraganaQuestions(): Question[] {
  const shuffled = [...hiragana].sort(() => Math.random() - 0.5).slice(0, 10)
  return shuffled.map(h => {
    const others = hiragana.filter(x => x.roman !== h.roman)
      .sort(() => Math.random() - 0.5).slice(0, 3).map(x => x.roman)
    return {
      question: h.char,
      answer: h.roman,
      hint: '',
      choices: [...others, h.roman].sort(() => Math.random() - 0.5),
    }
  })
}

export default function QuizPage() {
  const [quizType, setQuizType] = useState<QuizType | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const start = (type: QuizType) => {
    setQuizType(type)
    setQuestions(type === 'vocabulary' ? makeVocabQuestions() : makeHiraganaQuestions())
    setIndex(0); setScore(0); setAnswered(null); setFinished(false); setShowHint(false)
  }

  const handleAnswer = (choice: string) => {
    if (answered) return
    setAnswered(choice)
    if (choice === questions[index].answer) setScore(s => s + 1)
  }

  const next = () => {
    const nextIdx = index + 1
    if (nextIdx >= questions.length) { setFinished(true); return }
    setIndex(nextIdx); setAnswered(null); setShowHint(false)
  }

  const pct = Math.round((score / questions.length) * 100)

  if (!quizType) return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="pt-10 pb-8 flex items-center gap-3">
          <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Quiz</h1>
        </div>
        <p className="text-slate-500 mb-6 text-sm">Choose a quiz type to test yourself!</p>
        <div className="space-y-3">
          <button onClick={() => start('vocabulary')}
            className="w-full bg-white border-2 border-amber-200 rounded-2xl p-5 text-left active:scale-[0.98] transition-all">
            <p className="text-2xl mb-1">📖</p>
            <p className="font-bold text-slate-900 text-lg">Vocabulary Quiz</p>
            <p className="text-sm text-slate-400">Match Japanese words to their English meaning</p>
          </button>
          <button onClick={() => start('hiragana')}
            className="w-full bg-white border-2 border-rose-200 rounded-2xl p-5 text-left active:scale-[0.98] transition-all">
            <p className="text-2xl mb-1">🔤</p>
            <p className="font-bold text-slate-900 text-lg">Hiragana Quiz</p>
            <p className="text-sm text-slate-400">Read hiragana characters correctly</p>
          </button>
        </div>
      </div>
    </div>
  )

  if (finished) return (
    <div className="min-h-screen bg-violet-50 flex items-center justify-center px-4">
      <div className="text-center w-full max-w-sm">
        <p className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪'}</p>
        <p className="text-2xl font-bold text-slate-900 mb-1">Quiz Complete!</p>
        <p className="text-5xl font-bold text-violet-600 my-4">{score}<span className="text-2xl text-slate-400"> / {questions.length}</span></p>
        <p className="text-slate-500 mb-6">{pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good job! Keep practicing.' : 'Keep studying! You can do it!'}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => start(quizType)} className="px-6 py-3 bg-violet-600 text-white rounded-2xl font-semibold">Retry</button>
          <button onClick={() => setQuizType(null)} className="px-6 py-3 bg-white border-2 border-violet-200 text-violet-700 rounded-2xl font-semibold">Menu</button>
        </div>
      </div>
    </div>
  )

  const q = questions[index]
  return (
    <div className="min-h-screen bg-violet-50 pb-8">
      <div className="max-w-sm mx-auto px-4 pt-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setQuizType(null)} className="text-violet-600 font-medium text-sm">← Menu</button>
          <span className="text-sm text-slate-500">{index + 1} / {questions.length}</span>
          <span className="text-sm font-bold text-violet-600">{score} pts</span>
        </div>
        <div className="w-full bg-violet-200 rounded-full h-1.5 mb-8">
          <div className="bg-violet-500 h-1.5 rounded-full transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>

        <div className="bg-white rounded-3xl border-2 border-violet-200 flex flex-col items-center justify-center mb-3 p-6" style={{ minHeight: 140 }}>
          <span className={`font-bold text-slate-900 text-center ${quizType === 'hiragana' ? 'text-8xl' : 'text-3xl'}`}>{q.question}</span>
        </div>

        {q.hint && (
          <button onClick={() => setShowHint(!showHint)} className="w-full text-center text-sm text-violet-400 mb-4">
            {showHint ? q.hint : '💡 Show hint'}
          </button>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          {q.choices.map(c => (
            <button key={c} onClick={() => handleAnswer(c)} disabled={!!answered}
              className={`py-4 px-2 rounded-2xl text-sm font-bold border-2 transition-all leading-tight ${
                !answered ? 'bg-white border-violet-200 text-slate-700 active:scale-95' :
                c === q.answer ? 'bg-emerald-500 border-emerald-500 text-white' :
                c === answered ? 'bg-red-400 border-red-400 text-white' :
                'bg-white border-slate-200 text-slate-400'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {answered && (
          <button onClick={next} className="w-full py-4 bg-violet-600 text-white rounded-2xl font-semibold text-lg">
            {index + 1 >= questions.length ? 'See Results' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}
