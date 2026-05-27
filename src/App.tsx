import { useState } from 'react'
import { translations, type Locale } from './data/translations'
import Kundali from './features/Kundali'
import Rashifal from './features/Rashifal'
import LoveCompatibility from './features/LoveCompatibility'
import Numerology from './features/Numerology'

const pages = ['kundali', 'rashifal', 'love', 'numerology'] as const
export type PageKey = (typeof pages)[number]

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [page, setPage] = useState<PageKey>('kundali')
  const t = translations[locale]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>{t.app.title}</h1>
          <p>{t.app.description}</p>
        </div>
        <div className="language-switcher">
          <button
            type="button"
            className={locale === 'en' ? 'active' : ''}
            onClick={() => setLocale('en')}
          >
            English
          </button>
          <button
            type="button"
            className={locale === 'gu' ? 'active' : ''}
            onClick={() => setLocale('gu')}
          >
            ગુજરાતી
          </button>
        </div>
      </header>

      <nav className="app-nav">
        {pages.map((key) => (
          <button
            key={key}
            type="button"
            className={page === key ? 'active' : ''}
            onClick={() => setPage(key)}
          >
            {t.nav[key]}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {page === 'kundali' && <Kundali locale={locale} />}
        {page === 'rashifal' && <Rashifal locale={locale} />}
        {page === 'love' && <LoveCompatibility locale={locale} />}
        {page === 'numerology' && <Numerology locale={locale} />}
      </main>

      <footer className="app-footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  )
}

export default App
