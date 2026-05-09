export interface Word {
  japanese: string
  reading: string
  english: string
  category: string
}

export const vocabulary: Word[] = [
  // Greetings
  { japanese: 'こんにちは', reading: 'konnichiwa', english: 'Hello', category: 'Greetings' },
  { japanese: 'おはようございます', reading: 'ohayou gozaimasu', english: 'Good morning', category: 'Greetings' },
  { japanese: 'こんばんは', reading: 'konbanwa', english: 'Good evening', category: 'Greetings' },
  { japanese: 'さようなら', reading: 'sayounara', english: 'Goodbye', category: 'Greetings' },
  { japanese: 'ありがとう', reading: 'arigatou', english: 'Thank you', category: 'Greetings' },
  { japanese: 'すみません', reading: 'sumimasen', english: 'Excuse me / Sorry', category: 'Greetings' },
  { japanese: 'はじめまして', reading: 'hajimemashite', english: 'Nice to meet you', category: 'Greetings' },
  { japanese: 'よろしく', reading: 'yoroshiku', english: 'Please treat me well', category: 'Greetings' },

  // Numbers
  { japanese: 'いち', reading: 'ichi', english: '1', category: 'Numbers' },
  { japanese: 'に', reading: 'ni', english: '2', category: 'Numbers' },
  { japanese: 'さん', reading: 'san', english: '3', category: 'Numbers' },
  { japanese: 'し・よん', reading: 'shi / yon', english: '4', category: 'Numbers' },
  { japanese: 'ご', reading: 'go', english: '5', category: 'Numbers' },
  { japanese: 'ろく', reading: 'roku', english: '6', category: 'Numbers' },
  { japanese: 'しち・なな', reading: 'shichi / nana', english: '7', category: 'Numbers' },
  { japanese: 'はち', reading: 'hachi', english: '8', category: 'Numbers' },
  { japanese: 'く・きゅう', reading: 'ku / kyuu', english: '9', category: 'Numbers' },
  { japanese: 'じゅう', reading: 'juu', english: '10', category: 'Numbers' },

  // Colors
  { japanese: 'あか', reading: 'aka', english: 'Red', category: 'Colors' },
  { japanese: 'あお', reading: 'ao', english: 'Blue', category: 'Colors' },
  { japanese: 'きいろ', reading: 'kiiro', english: 'Yellow', category: 'Colors' },
  { japanese: 'みどり', reading: 'midori', english: 'Green', category: 'Colors' },
  { japanese: 'しろ', reading: 'shiro', english: 'White', category: 'Colors' },
  { japanese: 'くろ', reading: 'kuro', english: 'Black', category: 'Colors' },
  { japanese: 'むらさき', reading: 'murasaki', english: 'Purple', category: 'Colors' },
  { japanese: 'ピンク', reading: 'pinku', english: 'Pink', category: 'Colors' },

  // Days
  { japanese: 'げつようび', reading: 'getsuyoubi', english: 'Monday', category: 'Days' },
  { japanese: 'かようび', reading: 'kayoubi', english: 'Tuesday', category: 'Days' },
  { japanese: 'すいようび', reading: 'suiyoubi', english: 'Wednesday', category: 'Days' },
  { japanese: 'もくようび', reading: 'mokuyoubi', english: 'Thursday', category: 'Days' },
  { japanese: 'きんようび', reading: 'kin\'youbi', english: 'Friday', category: 'Days' },
  { japanese: 'どようび', reading: 'doyoubi', english: 'Saturday', category: 'Days' },
  { japanese: 'にちようび', reading: 'nichiyoubi', english: 'Sunday', category: 'Days' },

  // Food
  { japanese: 'ごはん', reading: 'gohan', english: 'Rice / Meal', category: 'Food' },
  { japanese: 'みず', reading: 'mizu', english: 'Water', category: 'Food' },
  { japanese: 'おちゃ', reading: 'ocha', english: 'Tea', category: 'Food' },
  { japanese: 'パン', reading: 'pan', english: 'Bread', category: 'Food' },
  { japanese: 'たまご', reading: 'tamago', english: 'Egg', category: 'Food' },
  { japanese: 'さかな', reading: 'sakana', english: 'Fish', category: 'Food' },
  { japanese: 'にく', reading: 'niku', english: 'Meat', category: 'Food' },
  { japanese: 'やさい', reading: 'yasai', english: 'Vegetable', category: 'Food' },
]

export const categories = Array.from(new Set(vocabulary.map(w => w.category)))
