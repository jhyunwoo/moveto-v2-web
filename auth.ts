import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { passkey } from '@better-auth/passkey'
import { headers } from 'next/headers'
import db from '@/db'
import * as schema from '@/db/schema'

const authBaseUrl = process.env.BETTER_AUTH_URL ?? process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL
const authSecret = process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET
const authOrigin = authBaseUrl ? new URL(authBaseUrl) : undefined

export const auth = betterAuth({
  appName: 'Moveto',
  baseURL: authBaseUrl,
  secret: authSecret,
  trustedOrigins: [process.env.NEXT_PUBLIC_SITE_URL, process.env.AUTH_URL, process.env.BETTER_AUTH_URL].filter(
    (origin): origin is string => Boolean(origin)
  ),
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    },
    kakao: {
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    },
  },
  user: {
    additionalFields: {
      plan: {
        type: 'string',
        required: true,
        defaultValue: 'Free',
        input: false,
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['github', 'kakao'],
    },
  },
  plugins: [
    passkey({
      rpID: process.env.BETTER_AUTH_RP_ID ?? authOrigin?.hostname ?? 'localhost',
      rpName: 'Moveto',
      origin: authOrigin?.origin,
    }),
    nextCookies(),
  ],
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
})

type BetterAuthSession = typeof auth.$Infer.Session

export type AuthSession = BetterAuthSession & {
  user: BetterAuthSession['user'] & {
    plan: string
  }
}

export type Session = AuthSession

export async function getSession() {
  return (await auth.api.getSession({
    headers: await headers(),
  })) as AuthSession | null
}
