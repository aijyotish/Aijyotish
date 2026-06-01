import { useState, type FormEvent } from 'react'
import { translations, type Locale } from '../data/translations'
import { callGroqAPI } from '../utils/groqApi'

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

function getZodiacSign(month: number, day: number) {
  const offsets = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22]
  return zodiacSigns[(month - 1 + (day >= offsets[month - 1] ? 0 : 11)) % 12]
}

const Kundali = ({ locale }: { locale: Locale }) => {
  const t = translations[locale].kundali
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('12:00')
  const [place, setPlace] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSummary('')

    ;(async () => {
      try {
        const birthDate = new Date(date)
        if (!date || Number.isNaN(birthDate.valueOf())) {
          setError(t.note)
          return
        }

        const prompt = `તમે એક નિષ્ણાત વૈદિક જ્યોતિષી છો. નીચેની જન્મ વિગતોની આધારે સંપૂર્ણ ગુજરાતી લિપિમાં ખૂબ વિગતવાર વૈદિક કુંડળી આપો જેમાં જમણવાર હોય: લગ્ન (ઍસેન્ડન્ટ), રાશિ, નક્ષત્ર, ગ્રહોની ચોક્કસ સ્થિતિ (ડિગ્રી અને રાશિ સાથે), બાર ઘરોનું વિગતવાર વર્ણન, દશા અવધિઓની સમીક્ષા અને કારકિર્દી, પ્રેમ, આરોગ્ય અને સંપત્તિ માટે જીવનની આગાહીઓ. તમામ આઉટપુટ માત્ર ગુજરાતી લિપિમાં આપો. જન્મ વિગતો:\nનામ: ${name || 'N/A'}\nતારીખ: ${date}\nસમય: ${time}\nસ્થળ: ${place}`

        const response = await callGroqAPI([
          { role: 'system', content: 'તમે એક ચોક્કસ અને વિશ્વસનીય વૈદિક જ્યોતિષ સહાયક છો. દરેક જવાબ સંપૂર્ણરૂપે ગુજરાતી લિપિમાં આપો અને સ્પષ્ટ વિભાગ સાથે રચો.' },
          { role: 'user', content: prompt }
        ])

        setSummary(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate kundali')
      } finally {
        setLoading(false)
      }
    })()
  }

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
          {t.date}
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label>
          {t.time}
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
        <label>
          {t.place}
          <input value={place} onChange={(event) => setPlace(event.target.value)} placeholder={t.place} />
        </label>
        <div className="form-actions">
          <button type="submit" disabled={loading}>{loading ? (locale === 'en' ? 'Generating...' : 'ઉત્પન્ન કરવામાં આવી રહ્યું છે...') : t.submit}</button>
        </div>
      </form>

      {error && (
        <div className="result-box" style={{ borderColor: '#e74c3c', backgroundColor: '#fadbd8' }}>
          <h3>{locale === 'en' ? 'Error' : 'ભૂલ'}</h3>
          <p>{error}</p>
        </div>
      )}

      {summary && (
        <div className="result-box">
          <h3>{t.result}</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{summary}</pre>
        </div>
      )}
    </section>
  )
}

export default Kundali
