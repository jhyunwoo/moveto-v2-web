import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { passkeyClient } from '@better-auth/passkey/client'
import type { auth, AuthSession } from '@/auth'

export const authClient = createAuthClient({
  basePath: '/api/auth',
  plugins: [inferAdditionalFields<typeof auth>(), passkeyClient()],
})

export const signIn = authClient.signIn
export const signOut = authClient.signOut

export type ClientAuthSession = AuthSession

export function useSession() {
  return authClient.useSession() as ReturnType<typeof authClient.useSession> & {
    data: ClientAuthSession | null
  }
}
