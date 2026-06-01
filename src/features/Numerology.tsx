import { useState, type FormEvent } from 'react'
import { translations, type Locale } from '../data/translations'
import { callGroqAPI } from '../utils/groqApi'

const lettersToNumber = (char: string) => {
  const value = char.toLowerCase().charCodeAt(0) - 96
  return value > 0 && value <= 26 ? ((value - 1) % 9) + 1 : 0
}

function reduceToSingleDigit(value: number): number {
  return value <= 9 ? value : reduceToSingleDigit(String(value).split('').reduce((sum, digit) => sum + Number(digit), 0))
}

function calculateLifePath(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.valueOf())) return 0
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const total = year + month + day
  return reduceToSingleDigit(total)
}

function calculateDestiny(name: string) {
  const total = name.split('').reduce((sum, char) => sum + lettersToNumber(char), 0)
  return total === 0 ? 0 : reduceToSingleDigit(total)
}

const Numerology = ({ locale }: { locale: Locale }) => {
  const t = translations[locale].numerology
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [lifePath, setLifePath] = useState<number | null>(null)
  const [destiny, setDestiny] = useState<number | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const path = calculateLifePath(birthDate)
    const dest = calculateDestiny(name)
    setLifePath(path || null)
    setDestiny(dest || null)
  }

  const [detailedReading, setDetailedReading] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchDetailedReading = async (lp: number | null, dt: number | null) => {
    if (!lp || !dt) return
    setLoading(true)
    try {
      const prompt = `You are an expert numerologist. Given the Life Path number ${lp} and Destiny number ${dt}, provide a complete numerology reading: personality traits, career guidance, relationships, health considerations, year-by-year themes (next 5 years), lucky colors/numbers/dates, and practical advice. Keep the tone supportive and actionable.`

      const response = await callGroqAPI([
        { role: 'system', content: 'You produce thorough and compassionate numerology reports.' },
        { role: 'user', content: prompt }
      ])

      setDetailedReading(response)
    } catch (err) {
      setDetailedReading(err instanceof Error ? err.message : 'Failed to fetch reading')
    } finally {
      setLoading(false)
    }
  }

  const insight = lifePath ? t.messages[lifePath] : ''

  return (
    <section className="card">
      <h2>{t.title}</h2>
      <p>{t.description}</p>

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          {t.name}
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder={t.name} />
        </label>
        <label>
          {t.birthDate}
          <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
        </label>
        <div className="form-actions">
          <button type="submit">{t.compute}</button>
        </div>
      </form>

      {lifePath !== null && destiny !== null && (
        <div className="result-box">
          <h3>{t.insight}</h3>
          <p>{t.lifePath}: {lifePath}</p>
          <p>{t.destiny}: {destiny}</p>
          <p>{insight}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => fetchDetailedReading(lifePath, destiny)} disabled={loading}>{loading ? (locale === 'en' ? 'Loading...' : 'લોડ થઈ રહ્યું છે...') : 'Full Reading'}</button>
          </div>

          {detailedReading && (
            <div style={{ marginTop: 12 }}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{detailedReading}</pre>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Numerology
