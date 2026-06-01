import { useState, type FormEvent } from 'react'
import { translations, type Locale } from '../data/translations'

type AuthProps = {
  locale: Locale
  loading: boolean
  error: string
  onSignIn: (email: string, password: string) => Promise<void>
  onSignUp: (email: string, password: string) => Promise<void>
  onGoogleSignIn: () => Promise<void>
}

const Auth = ({ locale, loading, error, onSignIn, onSignUp, onGoogleSignIn }: AuthProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const t = translations[locale].auth

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password) {
      return
    }

    if (mode === 'login') {
      await onSignIn(email, password)
    } else {
      await onSignUp(email, password)
    }
  }

  return (
    <section className="card">
      <h2>{t.title}</h2>
      <p>{t.description}</p>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          {t.email}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.email}
            required
          />
        </label>
        <label>
          {t.password}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t.password}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? t.loading : mode === 'login' ? t.login : t.signup}
          </button>
        </div>
      </form>

      <div className="result-box" style={{ marginTop: 16, borderColor: '#444c56', backgroundColor: '#0d1117' }}>
        {error ? <p style={{ color: '#f87171' }}>{error}</p> : <p>{mode === 'login' ? t.loginPrompt : t.signupPrompt}</p>}
      </div>

      <div className="form-actions" style={{ marginTop: 16 }}>
        <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? t.switchToSignup : t.switchToLogin}
        </button>
        <button type="button" onClick={onGoogleSignIn} disabled={loading}>
          {t.google}
        </button>
      </div>
    </section>
  )
}

export default Auth
