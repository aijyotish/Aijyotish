import { useState, type FormEvent } from 'react'
import { translations, type Locale } from '../data/translations'

const rashiKeys = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
] as const

type RashiKey = (typeof rashiKeys)[number]

const rashiLabels: Record<RashiKey, Record<Locale, string>> = {
  aries: { en: 'Aries', gu: 'મેષ' },
  taurus: { en: 'Taurus', gu: 'વૃષભ' },
  gemini: { en: 'Gemini', gu: 'મિથુન' },
  cancer: { en: 'Cancer', gu: 'કર્ક' },
  leo: { en: 'Leo', gu: 'સિંહ' },
  virgo: { en: 'Virgo', gu: 'કન્યા' },
  libra: { en: 'Libra', gu: 'તુલા' },
  scorpio: { en: 'Scorpio', gu: 'વૃશ્ચિક' },
  sagittarius: { en: 'Sagittarius', gu: 'ધનુ' },
  capricorn: { en: 'Capricorn', gu: 'મકર' },
  aquarius: { en: 'Aquarius', gu: 'કુંભ' },
  pisces: { en: 'Pisces', gu: 'મીન' }
}

const Rashifal = ({ locale }: { locale: Locale }) => {
  const t = translations[locale].rashifal
  const [rashi, setRashi] = useState<RashiKey>('aries')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(t.messages[rashi])
  }

  return (
    <section className="card">
      <h2>{t.title}</h2>
      <p>{t.description}</p>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          {t.select}
          <select value={rashi} onChange={(event) => setRashi(event.target.value as RashiKey)}>
            {rashiKeys.map((value) => (
              <option key={value} value={value}>
                {rashiLabels[value][locale]}
              </option>
            ))}
          </select>
        </label>
        <div className="form-actions">
          <button type="submit">{t.submit}</button>
        </div>
      </form>

      {message && (
        <div className="result-box">
          <h3>{t.result}</h3>
          <p>{message}</p>
        </div>
      )}
    </section>
  )
}

export default Rashifal
