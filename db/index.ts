import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.AUTH_DRIZZLE_URL

if (!connectionString) {
  throw new Error('AUTH_DRIZZLE_URL is not set')
}

const globalForDb = globalThis as typeof globalThis & {
  queryClient?: ReturnType<typeof postgres>
}

// Reuse the client during local dev so route reloads do not keep creating new pools.
const queryClient =
  globalForDb.queryClient ??
  postgres(connectionString, {
    connect_timeout: 10,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForDb.queryClient = queryClient
}

const db = drizzle(queryClient, { schema })

export default db
