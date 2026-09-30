# jwt-auth-web

React + Vite frontend for `jwt-internal-service-api`.

## Run it

1. Start the backend (`docker compose up -d`, then `./mvnw spring-boot:run`) on port 8080.
2. In this folder:

```bash
npm install
npm run dev          # start the dev server
npm run typecheck    # check types without building
```

3. Open http://localhost:5173

In development, Vite proxies every `/api` request to `http://localhost:8080`, so no CORS setup
is needed on the backend. For production you'll need to either serve the built `dist/` folder
from the same origin as the API (e.g. behind one reverse proxy), or add a CORS config to the backend.

## Routes

| Path                                           | Who can open it  | Everyone else is sent to         |
|------------------------------------------------|------------------|----------------------------------|
| `/login`, `/register`                          | Logged-out users | their home page                  |
| `/user`, `/user/profile`, `/user/settings`     | `USER` only      | `/login`, or `/admin` for admins |
| `/admin`, `/admin/users`, `/admin/settings`    | `ADMIN` only     | `/login`, or `/user` for users   |

## Where things live

- `src/App.tsx` - the route tree, including the nested routes and nav links
- `src/components/Layout.tsx` - header and nav shared by the nested pages (`<Outlet />`)
- `src/pages/user/`, `src/pages/admin/` - one file per page
- `src/auth/guards.tsx` - `RequireRole`, `PublicOnly`, and `homeFor(role)`
- `src/auth/AuthContext.tsx` - login, register, logout, and `authFetch` for protected calls
- `src/api.ts` - the fetch wrapper
- `src/types.ts` - types that mirror the backend DTOs
