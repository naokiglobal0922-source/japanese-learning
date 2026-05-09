export interface Phrase {
  japanese: string
  reading: string
  english: string
  category: string
}

export const phrases: Phrase[] = [
  // Self introduction
  { japanese: 'わたしは〜です。', reading: 'Watashi wa ~ desu.', english: 'I am ~.', category: 'Self Introduction' },
  { japanese: 'わたしの なまえは〜です。', reading: 'Watashi no namae wa ~ desu.', english: 'My name is ~.', category: 'Self Introduction' },
  { japanese: '〜から きました。', reading: '~ kara kimashita.', english: 'I\'m from ~.', category: 'Self Introduction' },
  { japanese: 'にほんごを べんきょうして います。', reading: 'Nihongo wo benkyou shite imasu.', english: 'I am studying Japanese.', category: 'Self Introduction' },

  // Shopping
  { japanese: 'これは いくらですか？', reading: 'Kore wa ikura desu ka?', english: 'How much is this?', category: 'Shopping' },
  { japanese: 'これを ください。', reading: 'Kore wo kudasai.', english: 'Please give me this.', category: 'Shopping' },
  { japanese: 'たかいです。', reading: 'Takai desu.', english: 'It\'s expensive.', category: 'Shopping' },
  { japanese: 'やすいです。', reading: 'Yasui desu.', english: 'It\'s cheap.', category: 'Shopping' },

  // Directions
  { japanese: '〜は どこですか？', reading: '~ wa doko desu ka?', english: 'Where is ~?', category: 'Directions' },
  { japanese: 'まっすぐ いってください。', reading: 'Massugu itte kudasai.', english: 'Please go straight.', category: 'Directions' },
  { japanese: 'みぎに まがってください。', reading: 'Migi ni magatte kudasai.', english: 'Please turn right.', category: 'Directions' },
  { japanese: 'ひだりに まがってください。', reading: 'Hidari ni magatte kudasai.', english: 'Please turn left.', category: 'Directions' },

  // Daily life
  { japanese: 'わかりました。', reading: 'Wakarimashita.', english: 'I understand.', category: 'Daily Life' },
  { japanese: 'わかりません。', reading: 'Wakarimasen.', english: 'I don\'t understand.', category: 'Daily Life' },
  { japanese: 'もう いちど おねがいします。', reading: 'Mou ichido onegaishimasu.', english: 'Please say it one more time.', category: 'Daily Life' },
  { japanese: 'にほんごが すこし はなせます。', reading: 'Nihongo ga sukoshi hanasemasu.', english: 'I can speak a little Japanese.', category: 'Daily Life' },
  { japanese: 'えいごが はなせますか？', reading: 'Eigo ga hanasemasu ka?', english: 'Can you speak English?', category: 'Daily Life' },
  { japanese: 'トイレは どこですか？', reading: 'Toire wa doko desu ka?', english: 'Where is the bathroom?', category: 'Daily Life' },
]

export const phraseCategories = Array.from(new Set(phrases.map(p => p.category)))
