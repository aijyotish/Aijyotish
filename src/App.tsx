import { useEffect, useState } from 'react'
import { translations, type Locale } from './data/translations'
import Kundali from './features/Kundali'
import Rashifal from './features/Rashifal'
import LoveCompatibility from './features/LoveCompatibility'
import Numerology from './features/Numerology'
import Profile from './features/Profile'
import Auth from './features/Auth'
import { supabase } from './utils/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'

const pages = ['kundali', 'rashifal', 'love', 'numerology'] as const
export type PageKey = (typeof pages)[number] | 'profile' | 'auth'

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [page, setPage] = useState<PageKey>('kundali')
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [authError, setAuthError] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(false)
  const t = translations[locale]

  useEffect(() => {
    let mounted = true

    const initializeSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      setSession(data.session)
      setUser(data.session?.user ?? null)
    }

    initializeSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event: string, newSession: Session | null) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (!newSession && page === 'profile') {
        setPage('kundali')
      }
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [page])

  const handleSignIn = async (email: string, password: string) => {
    setAuthError('')
    setLoadingAuth(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
    } else if (data.session) {
      setSession(data.session)
      setUser(data.session.user)
      setPage('profile')
    }

    setLoadingAuth(false)
  }

  const handleSignUp = async (email: string, password: string) => {
    setAuthError('')
    setLoadingAuth(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setAuthError(error.message)
    } else if (data.session) {
      setSession(data.session)
      setUser(data.session.user)
      setPage('profile')
    }

    setLoadingAuth(false)
  }

  const handleGoogleSignIn = async () => {
    setAuthError('')
    setLoadingAuth(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      setAuthError(error.message)
      setLoadingAuth(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setPage('kundali')
  }

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

        <div className="header-action">
          {!user ? (
            <button
              type="button"
              className={page === 'auth' ? 'active' : ''}
              onClick={() => setPage('auth')}
            >
              {t.nav.auth}
            </button>
          ) : (
            <button
              type="button"
              className={page === 'profile' ? 'active' : ''}
              onClick={() => setPage('profile')}
            >
              {t.nav.profile}
            </button>
          )}
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
        {user ? (
          <button
            type="button"
            className={page === 'profile' ? 'active' : ''}
            onClick={() => setPage('profile')}
          >
            {t.nav.profile}
          </button>
        ) : (
          <button type="button" onClick={() => setPage('auth')}>
            {t.nav.auth}
          </button>
        )}
      </nav>

      <main className="app-main">
        {page === 'kundali' && <Kundali locale={locale} />}
        {page === 'rashifal' && <Rashifal locale={locale} />}
        {page === 'love' && <LoveCompatibility locale={locale} />}
        {page === 'numerology' && <Numerology locale={locale} />}
        {page === 'profile' && user && <Profile locale={locale} user={user} />}
        {page === 'auth' && !user && (
          <Auth
            locale={locale}
            loading={loadingAuth}
            error={authError}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>{t.footer}</p>
        {user && (
          <button type="button" onClick={handleSignOut}>
            {t.profile.signOut}
          </button>
        )}
      </footer>
    </div>
  )
}

export default App
