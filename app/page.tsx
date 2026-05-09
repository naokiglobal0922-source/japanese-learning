import Link from 'next/link'

const lessons = [
  { href: '/hiragana', label: 'Hiragana', jp: 'ひらがな', desc: 'The foundation of Japanese', chars: 'あいうえお', num: '01' },
  { href: '/katakana', label: 'Katakana', jp: 'カタカナ', desc: 'Foreign words & emphasis', chars: 'アイウエオ', num: '02' },
  { href: '/vocabulary', label: 'Vocabulary', jp: '単語', desc: 'Essential everyday words', chars: '言葉', num: '03' },
  { href: '/phrases', label: 'Phrases', jp: 'フレーズ', desc: 'Real conversation starters', chars: '会話', num: '04' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] bg-white blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.03] bg-white blur-3xl" />
      </div>

      <div className="max-w-md mx-auto px-6 relative">
        {/* Hero */}
        <div className="pt-20 pb-14">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-white/30 uppercase mb-8">
            Language Learning
          </p>

          <div className="mb-6">
            <h1 className="text-[72px] font-black leading-none tracking-tight text-white">
              日本語
            </h1>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-[28px] font-light text-white/40 tracking-widest">Nihongo</span>
            </div>
          </div>

          <div className="w-12 h-[1px] bg-white/20 my-6" />

          <p className="text-white/40 text-sm font-light leading-relaxed max-w-[260px]">
            Master Japanese from zero.<br />
            Structured. Beautiful. Effective.
          </p>
        </div>

        {/* Lessons */}
        <div className="space-y-2 pb-20">
          {lessons.map((lesson) => (
            <Link key={lesson.href} href={lesson.href}>
              <div className="group relative flex items-center gap-5 rounded-2xl px-5 py-5 border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 overflow-hidden">
                {/* Background character */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl font-black text-white/[0.04] select-none pointer-events-none leading-none">
                  {lesson.chars}
                </div>

                {/* Number */}
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0 border border-white/[0.08]">
                  <span className="text-[11px] font-bold text-white/40 tracking-wider">{lesson.num}</span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2.5">
                    <p className="font-bold text-[17px] text-white tracking-tight">{lesson.label}</p>
                    <p className="text-white/25 text-sm">{lesson.jp}</p>
                  </div>
                  <p className="text-white/35 text-[13px] mt-0.5">{lesson.desc}</p>
                </div>

                {/* Arrow */}
                <svg className="w-4 h-4 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="pb-10 flex items-center gap-3">
          <div className="w-8 h-[1px] bg-white/10" />
          <p className="text-white/20 text-[11px] tracking-widest uppercase">Begin your journey</p>
        </div>
      </div>
    </main>
  )
}
