import Link from 'next/link'

const lessons = [
  { href: '/hiragana', label: 'Hiragana', jp: 'ひらがな', desc: 'The basics of Japanese writing', count: '46 characters' },
  { href: '/katakana', label: 'Katakana', jp: 'カタカナ', desc: 'For foreign words & emphasis', count: '46 characters' },
  { href: '/vocabulary', label: 'Vocabulary', jp: '単語', desc: 'Essential everyday words', count: '40 words' },
  { href: '/phrases', label: 'Phrases', jp: 'フレーズ', desc: 'Real conversation starters', count: '18 phrases' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-5">
        {/* Hero */}
        <div className="pt-16 pb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-4">Learn Japanese</p>
          <h1 className="text-5xl font-black text-slate-900 leading-none mb-3">
            日本語<br />
            <span className="text-slate-300">Nihongo</span>
          </h1>
          <p className="text-slate-500 text-base mt-4">Start from zero. Learn step by step.</p>
        </div>

        {/* Lessons */}
        <div className="space-y-3 pb-16">
          {lessons.map((lesson, i) => (
            <Link key={lesson.href} href={lesson.href}>
              <div className="group flex items-center gap-5 bg-slate-950 text-white rounded-3xl px-6 py-5 active:scale-[0.98] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <p className="font-bold text-lg">{lesson.label}</p>
                    <p className="text-white/40 text-sm">{lesson.jp}</p>
                  </div>
                  <p className="text-white/50 text-sm truncate">{lesson.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-white/30">{lesson.count}</p>
                  <svg className="w-4 h-4 text-white/30 mt-1 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
