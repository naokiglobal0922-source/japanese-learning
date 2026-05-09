import Link from 'next/link'

const menu = [
  { href: '/hiragana', label: 'Hiragana', sub: 'あいうえお', emoji: '🔤', color: 'bg-rose-50 border-rose-200 text-rose-700' },
  { href: '/katakana', label: 'Katakana', sub: 'アイウエオ', emoji: '🔡', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { href: '/vocabulary', label: 'Vocabulary', sub: 'Words & Phrases', emoji: '📖', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { href: '/phrases', label: 'Phrases', sub: 'Useful Sentences', emoji: '💬', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { href: '/quiz', label: 'Quiz', sub: 'Test yourself!', emoji: '✏️', color: 'bg-violet-50 border-violet-200 text-violet-700' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="pt-14 pb-8 text-center">
          <p className="text-4xl mb-3">🇯🇵</p>
          <h1 className="text-3xl font-bold text-slate-900">Learn Japanese</h1>
          <p className="text-slate-500 mt-2 text-sm">Beginner friendly • Start from zero</p>
        </div>

        <div className="space-y-3">
          {menu.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-4 rounded-2xl border-2 p-5 ${item.color} active:scale-[0.98] transition-all`}>
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="font-bold text-lg leading-tight">{item.label}</p>
                  <p className="text-sm opacity-70">{item.sub}</p>
                </div>
                <svg className="w-5 h-5 ml-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          日本語を学ぼう • Learn Japanese Step by Step
        </p>
      </div>
    </main>
  )
}
