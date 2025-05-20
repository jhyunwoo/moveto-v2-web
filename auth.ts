import NextAuth, { DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Kakao from 'next-auth/providers/kakao'
import db from '@/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import Passkey from 'next-auth/providers/passkey'

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      plan: string
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user']
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  experimental: { enableWebAuthn: true },
  providers: [GitHub, Kakao, Passkey],
  callbacks: {
    async session({ session, user }) {
      const userPlan = await db.select({ plan: users.plan }).from(users).where(eq(users.id, user.id))
      session.user.plan = userPlan[0].plan
      return session
    },
  },
  debug: process.env.NODE_ENV !== 'production',
  logger: { warn() {} },
})
