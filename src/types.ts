export type Role = 'USER' | 'ADMIN'

export interface User {
  username: string
  role: Role
}

// GET /api/user/me
export interface MeResponse {
  username: string
  role: Role
  expiresAt: string
}
