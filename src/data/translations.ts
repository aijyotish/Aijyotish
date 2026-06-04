export type Locale = 'en' | 'gu'

export const translations: Record<Locale, any> = {
  en: {
    app: {
      title: 'Aijyotish Astrology',
      description: 'Explore Kundali, Rashifal, Love Compatibility, and Numerology in Gujarati.'
    },
    nav: {
      kundali: 'Kundali',
      rashifal: 'Rashifal',
      love: 'Love Compatibility',
      numerology: 'Numerology',
      profile: 'Profile',
      auth: 'Login / Signup'
    },
    footer: 'Created for astrology seekers with Gujarati guidance.',
    kundali: {
      title: 'Kundali Calculator',
      description: 'Enter your birth details and get a simple Vedic-style chart summary.',
      name: 'Name',
      date: 'Date of Birth',
      time: 'Time of Birth',
      place: 'Place',
      submit: 'Generate Kundali',
      result: 'Your Kundali Summary',
      energy: 'Your rising sign energy is',
      note: 'This is a simplified astrological impression for guidance only.'
    },
    rashifal: {
      title: 'Rashifal Horoscope',
      description: 'Choose your zodiac sign to read today’s rashifal.',
      select: 'Choose your Rashi',
      submit: 'Read Rashifal',
      result: 'Today’s Horoscope',
      messages: {
        aries: 'A fresh energy supports your plans, stay bold and patient.',
        taurus: 'Practical choices pay off today. Focus on relationships and routine.',
        gemini: 'Curiosity leads to new connections. Listen before you speak.',
        cancer: 'Home and emotion are gentle. Take quiet time for yourself.',
        leo: 'Your charisma shines. Use it to inspire others with kindness.',
        virgo: 'Small details matter. Organize your tasks and trust your instincts.',
        libra: 'Balance is your gift. Seek harmony in work and family.',
        scorpio: 'Intensity grows. Channel it through creativity rather than conflict.',
        sagittarius: 'Adventure calls. Learn, laugh, and keep your goals in sight.',
        capricorn: 'Discipline strengthens your progress. Take steady steps.',
        aquarius: 'Innovation helps you solve problems. Share your ideas openly.',
        pisces: 'Dreams feel vivid. Practice compassion and gentle self-care.'
      }
    },
    love: {
      title: 'Love Compatibility',
      description: 'Enter two names and birth dates to see a compatibility estimate.',
      firstName: 'First Name',
      secondName: 'Second Name',
      birthDate: 'Birth Date',
      calculate: 'Calculate Compatibility',
      result: 'Compatibility Score',
      advice: 'Compatibility note',
      summary: 'Your connection score is'
    },
    auth: {
      title: 'Login or Sign Up',
      description: 'Sign in or create a new account to save your readings and access your profile.',
      email: 'Email Address',
      password: 'Password',
      loading: 'Loading...',
      login: 'Login',
      signup: 'Sign Up',
      loginPrompt: 'Enter your credentials to sign in.',
      signupPrompt: 'Create a new account to get started.',
      switchToSignup: 'Create an account',
      switchToLogin: 'Already have an account? Login',
      google: 'Continue with Google'
    },
    profile: {
      title: 'Your Profile',
      signedInAs: 'Signed in as',
      loading: 'Loading profile…',
      noReadings: 'No saved readings yet.',
      savedReadings: 'Saved Readings',
      untitled: 'Untitled reading',
      signOut: 'Sign Out'
    },
    numerology: {
      title: 'Numerology',
      description: 'Discover your life path and destiny numbers from your name and date of birth.',
      name: 'Full Name',
      birthDate: 'Date of Birth',
      compute: 'Compute Numerology',
      lifePath: 'Life Path Number',
      destiny: 'Destiny Number',
      insight: 'Numerology Insight',
      messages: {
        1: 'Leadership and independence are at your core. Trust your creative drive.',
        2: 'Harmony and support are strengths. Your empathy is your power.',
        3: 'Expression and joy come naturally. Share your voice with confidence.',
        4: 'Stability and discipline shape your path. Build strong foundations.',
        5: 'Change and freedom inspire you. Embrace variety with balance.',
        6: 'Care and responsibility define you. Create safe, loving spaces.',
        7: 'Reflection and intuition guide you. Honor your inner wisdom.',
        8: 'Ambition and success attract you. Lead with fairness and persistence.',
        9: 'Compassion and completion empower you. Serve others with heart.'
      }
    }
  },
  gu: {
    app: {
      title: 'આજ્યોટિશ astrology',
      description: 'ગુજરાતીમાં કુંડળી, રાશિફળ, લવ કોમ્પેટિબિલિટી, અને ન્યુમેરોલોજીનો અભ્યાસ કરો.'
    },
    nav: {
      kundali: 'કુંડળી',
      rashifal: 'રાશિફળ',
      love: 'લવ કોમ્પેટિબિલિટી',
      numerology: 'ન્યુમેરોલોજી',
      profile: 'પ્રોફાઇલ',
      auth: 'લોગિન / સાઇનઅપ'
    },
    footer: 'ગુજરાતી માર્ગદર્શન સાથેનું જ્યોતિષ એપ્લિકેશન.',
    kundali: {
      title: 'કુંડળી કૅલ્ક્યુલેટર',
      description: 'જન્મ વિગતો દાખલ કરો અને સરળ વૈદિક શૈલીનું સારાંશ મેળવો.',
      name: 'નામ',
      date: 'જન્મ તારીખ',
      time: 'જન્મ સમય',
      place: 'જન્મ સ્થળ',
      submit: 'કુંડળી બનાવો',
      result: 'તમારી કુંડળી સારાંશ',
      energy: 'તમારી રાઇઝિંગ સાઇન ઊર્જા છે',
      note: 'આ માર્ગદર્શન માટે સરળ કરેલું જ્યોઇતિષ વાચન છે.'
    },
    rashifal: {
      title: 'રાશિફળ',
      description: 'તમારી રાશિ પસંદ કરો અને આજનું રાશિફળ વાંચો.',
      select: 'તમારી રાશિ પસંદ કરો',
      submit: 'રાશિફળ વાંચો',
      result: 'આજનું રાશિફળ',
      messages: {
        aries: 'તાજી ઊર્જા તમારી યોજનાઓને સહારો આપે છે, ધૈર્ય રાખો.',
        taurus: 'વ્યવહારુ પોસિશન્સ લાભ આપશે. સંબંધો અને નિયમિતતામાં ધ્યાન આપો.',
        gemini: 'જિજ્ઞાસુતા નવા સંપર્ક લાવે છે. પહેલા સાંભળો અને પછી બોલો.',
        cancer: 'ઘર અને ભાવનાઓ સૌમ્ય છે. તમારા માટે શાંતિભર્યો સમય લો.',
        leo: 'તમારી કરીizma ચમકે છે. કોપirayતમાં નમ્રતા સાથે નેતૃત્વ કરો.',
        virgo: 'નાની વસ્તુઓ મહત્વની છે. તમારા કાર્યો ગોઠવો અને અંદરથી વિશ્વાસ રાખો.',
        libra: 'સંતુલન તમારો આપો છે. કામ અને પરિવારમાં સમન્વય શોધો.',
        scorpio: 'તીવ્રતા વધે છે. સર્જનાત્મકતામાં ચેનલ કરો.',
        sagittarius: 'સાહસિકતા મંગે છે. શીખો, હસો અને તમારા લક્ષ્ય યાદ રાખો.',
        capricorn: 'અનુશાસન તમારી પ્રગતિ મજબૂત કરે છે. ધીરમાં ધીરમાં આગળ વધો.',
        aquarius: 'નવાચાર સમસ્યાનુ નિરાકરણ લાવે છે. તમારા વિચાર શેર કરો.',
        pisces: 'સપનાઓ જીવંત લાગે છે. કૃપા અને નમ્રતા સાથે પોતાને દ્યો.'
      }
    },
    love: {
      title: 'લવ કોમ્પેટિબિલિટી',
      description: 'બન્ને નામ અને જન્મ તારીખો દાખલ કરો અને વર્ષાઓનું અનુમાન મેળવો.',
      firstName: 'પ્રથમ નામ',
      secondName: 'બીજું નામ',
      birthDate: 'જન્મ તારીખ',
      calculate: 'કોમ્પેટિબિલિટી કૅલ્ક્યુલેટ કરો',
      result: 'કોમ્પેટિબિલિટી સ્કોર',
      advice: 'સૂચન',
      summary: 'તમારો જોડાણ સ્કોર છે'
    },
    auth: {
      title: 'લોગિન અથવા સાઇનઅપ',
      description: 'તમારા રીડિંગ્સ સાચવવા અને પ્રોફાઇલ ઍક્સેસ કરવા માટે સાઇન ઇન અથવા નવું ખાતું બનાવો.',
      email: 'ઇમેલ સરનામું',
      password: 'પાસવર્ડ',
      loading: 'લોડ થઈ રહ્યું છે...',
      login: 'લોગિન',
      signup: 'સાઇનઅપ',
      loginPrompt: 'સાઇન ઇન કરવા માટે તમારા આધાર દાખલ કરો.',
      signupPrompt: 'પ્રારંભ કરવા માટે નવું ખાતું બનાવો.',
      switchToSignup: 'ખાતું બનાવો',
      switchToLogin: 'પહેલું ખાતું છે? લોગિન',
      google: 'ગૂગલથી આગળ વધો'
    },
    profile: {
      title: 'તમારી પ્રોફાઇલ',
      signedInAs: 'સાઇન ઇન તરીકે',
      loading: 'પ્રોફાઇલ લોડ થઈ રહી છે…',
      noReadings: 'અત્યારે કોઈ સેવ થયેલી રીડિંગ નથી.',
      savedReadings: 'સેવ થયેલી રીડિંગ્સ',
      untitled: 'નામ વિનાનું રીડિંગ',
      signOut: 'સાઇન આઉટ'
    },
    numerology: {
      title: 'ન્યુમેરોલોજી',
      description: 'તમારા નામ અને જન્મ તા.થી લાઇફ પાથ અને ડેસ્ટિની નંબરો શોધો.',
      name: 'પૂર્ણ નામ',
      birthDate: 'જન્મ તારીખ',
      compute: 'ન્યુમેરોલોજી ગણો',
      lifePath: 'લાઇફ પાથ નંબર',
      destiny: 'ડેસ્ટિની નંબર',
      insight: 'ન્યુમેરોલોજી દ્રષ્ટિકોણ',
      messages: {
        1: 'આગૂπόν અને સ્વતંત્રતા તમારા મંત્ર છે. તમારા સર્જનાત્મક પ્રેરણાને વિશ્વાસ આપો.',
        2: 'સંમેલન અને સહાય તમારી શક્તિ છે. તમારી સહાનુભૂતિ ખૂબ મજબૂત છે.',
        3: 'વ્યક્તિત્વ અને આનંદ તમારી પ્રકૃતિ છે. આત્મવિશ્વાસથી તમારો અવાજ વહેંચો.',
        4: 'સ્થિરતાનું માળખું તમારું માર્ગદર્શક છે. મજબૂત બેજ પેદા કરો.',
        5: 'બદલાવ અને સ્વતંત્રતા તમને પ્રેરણા આપે છે. સંતુલિત રીતે વિવિધતા અપનાવો.',
        6: 'કાળજી અને જવાબદારી તમને ઓળખાવે છે. પ્રેમાળ સ્થળો બનાવો.',
        7: 'વિચાર અને આંતરિક બુદ્ધિ તમારું માર્ગદર્શન છે. તમારા અંદરના જ્ઞાનનો માન રાખો.',
        8: 'Ambition અને સફળતા તમારું આકર્ષણ છે. ઈમાનદારી અને અડીખમ પ્રયાસો સાથે નેતૃત્વ કરો.',
        9: 'સહાનુભૂતિ અને પૂર્ણતા તમને સશક્ત કરે છે. હૃદયથી બીજાઓને સેવા આપો.'
      }
    }
  }
}
