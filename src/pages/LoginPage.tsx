import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../auth/AuthContext.tsx'

export default function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
    } catch (err) {
      setError((err as Error).message)
      setLoading(false)
    }
  }

  return (
    <main className="center">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <p className="muted">Users go to /user, admins go to /admin.</p>

        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        {error && <p className="error">{error}</p>}
        <button disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>

        <p className="muted">
          No account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </main>
  )
}
