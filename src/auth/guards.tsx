import { Navigate, Outlet } from 'react-router'
import type { Role } from '../types.ts'
import { useAuth } from './AuthContext.tsx'

// Each role has its own home page.
export function homeFor(role: Role) {
  return role === 'ADMIN' ? '/admin' : '/user'
}

// Only lets in users with this exact role.
// Logged out -> /login. Wrong role -> their own home page.
export function RequireRole({ role }: { role: Role }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to={homeFor(user.role)} replace />
  return <Outlet />
}

// Login and register pages. Once logged in, you're sent to your home page.
export function PublicOnly() {
  const { user } = useAuth()

  if (user) return <Navigate to={homeFor(user.role)} replace />
  return <Outlet />
}

// Any unknown URL: go home if logged in, otherwise to login.
export function Redirect() {
  const { user } = useAuth()
  return <Navigate to={user ? homeFor(user.role) : '/login'} replace />
}
