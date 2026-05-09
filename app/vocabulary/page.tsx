"use client"

import { useState } from 'react'
import Link from 'next/link'
import { vocabulary, categories } from '@/data/vocabulary'

export default function VocabularyPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [flipped, setFlipped] = useState<string | null>(null)

  const words = vocabulary.filter(w => w.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="pt-10 pb-4 flex items-center gap-3">
          <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Vocabulary</h1>
            <p className="text-sm text-slate-400">Tap a card to reveal</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setFlipped(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-amber-500 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {words.map((word) => (
            <button key={word.japanese} onClick={() => setFlipped(flipped === word.japanese ? null : word.japanese)}
              className="w-full text-left">
              <div className={`rounded-2xl border-2 p-4 transition-all ${flipped === word.japanese ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-2xl font-bold ${flipped === word.japanese ? 'text-white' : 'text-slate-900'}`}>{word.japanese}</p>
                    <p className={`text-sm mt-0.5 ${flipped === word.japanese ? 'text-amber-100' : 'text-slate-400'}`}>{word.reading}</p>
                  </div>
                  {flipped === word.japanese ? (
                    <p className="text-xl font-bold text-white">{word.english}</p>
                  ) : (
                    <span className="text-slate-300 text-lg">👆</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
