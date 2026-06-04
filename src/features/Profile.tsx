import { useEffect, useState } from 'react'
import { translations, type Locale } from '../data/translations'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'

type Reading = {
  id: string
  name: string
  date: string
  time: string
  place: string
  summary: string
  created_at: string
}

type ProfileProps = {
  locale: Locale
  user: User
}

const Profile = ({ locale, user }: ProfileProps) => {
  const t = translations[locale].profile
  const [readings, setReadings] = useState<Reading[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReadings = async () => {
      setLoading(true)
      setError('')
      const { data, error } = await supabase
        .from('kundali_readings')
        .select('id,name,date,time,place,summary,created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
        setReadings([])
      } else {
        setReadings((data ?? []) as Reading[])
      }
      setLoading(false)
    }

    fetchReadings()
  }, [user.id])

  return (
    <section className="card">
      <h2>{t.title}</h2>
      <p>
        {t.signedInAs}: <strong>{user.email ?? user.id}</strong>
      </p>

      {loading && <p>{t.loading}</p>}
      {error && (
        <div className="result-box" style={{ borderColor: '#e74c3c', backgroundColor: '#fadbd8' }}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && readings.length === 0 && <p>{t.noReadings}</p>}

      {!loading && readings.length > 0 && (
        <div>
          <h3>{t.savedReadings}</h3>
          <div className="result-box">
            {readings.map((reading) => (
              <article key={reading.id} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <strong>{reading.name || t.untitled}</strong>
                  <span>{new Date(reading.created_at).toLocaleString()}</span>
                </div>
                <p>{reading.date} · {reading.time} · {reading.place}</p>
                <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>{reading.summary}</pre>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default Profile
