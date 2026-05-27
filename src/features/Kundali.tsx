import { useState, type FormEvent } from 'react'
import { translations, type Locale } from '../data/translations'

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const birthDate = new Date(date)
    if (!date || Number.isNaN(birthDate.valueOf())) {
      setSummary(t.note)
      return
    }
    const sign = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate())
    const energy = `${t.energy} ${sign}.`
    setSummary(`${name ? `${name}, ` : ''}${energy} ${t.note}`)
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
          <button type="submit">{t.submit}</button>
        </div>
      </form>

      {summary && (
        <div className="result-box">
          <h3>{t.result}</h3>
          <p>{summary}</p>
        </div>
      )}
    </section>
  )
}

export default Kundali
