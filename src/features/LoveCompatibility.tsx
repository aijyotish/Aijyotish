import { useState, type FormEvent } from 'react'
import { translations, type Locale } from '../data/translations'
import { callGroqAPI } from '../utils/groqApi'

function getNameValue(name: string) {
  return name
    .toLowerCase()
    .split('')
    .reduce((sum, char) => sum + (char.charCodeAt(0) % 9) + 1, 0)
}

function getCompatibilityScore(name1: string, name2: string, date1: string, date2: string) {
  const base = Math.abs(getNameValue(name1) - getNameValue(name2))
  const dateDiff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime())
  const days = Number.isNaN(dateDiff) ? 0 : Math.floor(dateDiff / (1000 * 60 * 60 * 24))
  const score = 100 - ((base % 10) * 6 + (days % 20))
  return Math.max(25, Math.min(100, score))
}

const LoveCompatibility = ({ locale }: { locale: Locale }) => {
  const t = translations[locale].love
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [score, setScore] = useState<number | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newScore = getCompatibilityScore(firstName, secondName, date1, date2)
    setScore(newScore)
  }

  const generateDetailedReport = async () => {
    if (!firstName || !secondName) return
    const currentScore = score ?? getCompatibilityScore(firstName, secondName, date1, date2)
    try {
      const prompt = `નીચે આપેલા બંને પાર્ટનર્સની વિગતોના આધારે વિગતવાર પ્રેમસંગતિ અહેવાલ આપો અને સ્પષ્ટ ટકાવારી સાથે સંક્ષિપ્ત સારાંશ રજૂ કરો: મજબૂતી, કમજોરી, ભાવનાત્મક સુમેલ, સંવાદ, સેક્સ્યુઅલ સુમેલ, લાંબા ગાળાનો સંભાવ અને પ્રયોગી સલાહ. આપેલ અંકિય સ્કોરને અનુકૂળતા ટકાવારી તરીકે ઉપયોગ કરો: ${currentScore}.

ભાગીદાર A: ${firstName} (જન્મ તારીખ: ${date1 || 'અજાણી'})
ભાગીદાર B: ${secondName} (જન્મ તારીખ: ${date2 || 'અજાણી'})

બધા જવાબ માત્ર ગુજરાતી લિપિમાં આપો.`

      const response = await callGroqAPI([
        { role: 'system', content: 'તમે વિચારશીલ સંબંધ વિશ્લેષક છો. સંપૂર્ણ રીતે ગુજરાતી લિપિમાં સંતુલિત અને ઉપયોગી સંયોગ રીડિંગ આપો.' },
        { role: 'user', content: prompt }
      ])

      return response
    } catch (err) {
      return err instanceof Error ? err.message : 'Failed to generate report'
    }
  }

  const advice = score
    ? score > 80
      ? locale === 'en'
        ? 'Your relationship has a strong bond. Focus on honest communication.'
        : 'તમારા સંબંધમાં મજબૂત બંધન છે. સાફ સંવાદ પર ધ્યાન આપો.'
      : score > 60
      ? locale === 'en'
        ? 'There is good potential. Nurture mutual understanding and shared goals.'
        : 'સારા સંભાવનાઓ છે. પરસ્પર સમજ અને સાથ પડદાર બનાવો.'
      : locale === 'en'
      ? 'Work on patience and empathy to strengthen this bond.'
      : 'સહનશીલતા અને સહાનુભૂતિની સાથે આ સંબંધ મજબૂત બનાવો.'
    : ''

  return (
    <section className="card">
      <h2>{t.title}</h2>
      <p>{t.description}</p>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          {t.firstName}
          <input value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder={t.firstName} />
        </label>
        <label>
          {t.secondName}
          <input value={secondName} onChange={(event) => setSecondName(event.target.value)} placeholder={t.secondName} />
        </label>
        <label>
          {t.birthDate} 1
          <input type="date" value={date1} onChange={(event) => setDate1(event.target.value)} />
        </label>
        <label>
          {t.birthDate} 2
          <input type="date" value={date2} onChange={(event) => setDate2(event.target.value)} />
        </label>
        <div className="form-actions">
          <button type="submit">{t.calculate}</button>
        </div>
      </form>

      {score !== null && (
        <div className="result-box">
          <h3>{t.result}</h3>
          <p>{t.summary} {score}%</p>
          <p>{t.advice}: {advice}</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={async () => {
              const report = await generateDetailedReport()
              alert(report)
            }}>Detailed Report</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default LoveCompatibility
