"use client"

import { useState } from 'react'
import Link from 'next/link'
import { phrases, phraseCategories } from '@/data/phrases'

export default function PhrasesPage() {
  const [activeCategory, setActiveCategory] = useState(phraseCategories[0])
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = phrases.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="pt-10 pb-4 flex items-center gap-3">
          <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Phrases</h1>
            <p className="text-sm text-slate-400">Tap to see pronunciation</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {phraseCategories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setExpanded(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((phrase) => (
            <button key={phrase.japanese} onClick={() => setExpanded(expanded === phrase.japanese ? null : phrase.japanese)}
              className="w-full text-left">
              <div className={`rounded-2xl border-2 p-4 transition-all ${expanded === phrase.japanese ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-slate-200'}`}>
                <p className={`font-bold text-base ${expanded === phrase.japanese ? 'text-white' : 'text-slate-900'}`}>{phrase.japanese}</p>
                {expanded === phrase.japanese ? (
                  <div className="mt-2 space-y-1">
                    <p className="text-emerald-100 text-sm">{phrase.reading}</p>
                    <p className="text-white font-semibold">{phrase.english}</p>
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm mt-0.5">{phrase.english}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
