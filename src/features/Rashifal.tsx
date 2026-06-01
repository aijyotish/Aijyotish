import { useState, type FormEvent } from 'react'
import { translations, type Locale } from '../data/translations'
import { callGroqAPI } from '../utils/groqApi'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const rashiName = rashiLabels[rashi][locale]
      const prompt = locale === 'en'
        ? `Provide a detailed daily horoscope for ${rashiName}. Include: a short summary (2-3 sentences), lucky color, lucky number, lucky time of day, and brief predictions for Love, Career, Health, and Money. Keep language clear and practical.`
        : `${rashiName} માટે વિગતવાર દૈનિક રાશિફળ આપો. સમાવિષ્ટ કરો: સંક્ષિપ્ત સારાંશ (2-3 વાક્ય), લકી કલર, લકી નંબર, દિવસનો સારો સમય, અને પ્રેમ, કારકિર્દી, તંદુરસ્તી અને વિકાસ માટે ટૂંકી આગાહીઓ. ભાષા સરળ અને પ્રયોગી રાખો.`
      
      const response = await callGroqAPI([
        {
          role: 'system',
          content: locale === 'en'
            ? 'You are a concise, practical astrology assistant. Provide structured output with labeled sections.'
            : 'તમે સંક્ષિપ્ત અને પ્રયોગી જ્યોતિષ સહાયક છો. લેબલ કરવામાં આવેલા વિભાગો સાથે રચિત આઉટપુટ આપો.'
        },
        { role: 'user', content: prompt }
      ])
      
      setMessage(response)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch horoscope'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>{t.title}</h2>
      <p>{t.description}</p>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          {t.select}
          <select value={rashi} onChange={(event) => setRashi(event.target.value as RashiKey)} disabled={loading}>
            {rashiKeys.map((value) => (
              <option key={value} value={value}>
                {rashiLabels[value][locale]}
              </option>
            ))}
          </select>
        </label>
        <div className="form-actions">
          <button type="submit" disabled={loading}>{loading ? (locale === 'en' ? 'Loading...' : 'લોડ થઈ રહ્યું છે...') : t.submit}</button>
        </div>
      </form>

      {error && (
        <div className="result-box" style={{ borderColor: '#e74c3c', backgroundColor: '#fadbd8' }}>
          <h3>{locale === 'en' ? 'Error' : 'ભૂલ'}</h3>
          <p>{error}</p>
        </div>
      )}

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
