import {
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'user',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    email: text('email').notNull(),
    emailVerified: boolean('emailVerified').notNull().default(false),
    legacyEmailVerifiedAt: timestamp('legacyEmailVerifiedAt', { mode: 'date' }),
    image: text('image'),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    plan: text('plan').default('Free').notNull(),
  },
  table => ({
    emailUnique: uniqueIndex('user_email_unique').on(table.email),
  })
)

export const accounts = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('accountId').notNull(),
    providerId: text('providerId').notNull(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accessToken: text('accessToken'),
    refreshToken: text('refreshToken'),
    idToken: text('idToken'),
    accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { mode: 'date' }),
    refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { mode: 'date' }),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    providerAccountUnique: uniqueIndex('account_provider_account_unique').on(table.providerId, table.accountId),
    userIdIndex: index('account_user_id_idx').on(table.userId),
  })
)

export const sessions = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expiresAt', { mode: 'date' }).notNull(),
    token: text('token').notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  },
  table => ({
    tokenUnique: uniqueIndex('session_token_unique').on(table.token),
    userIdIndex: index('session_user_id_idx').on(table.userId),
  })
)

export const verifications = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expiresAt', { mode: 'date' }).notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => ({
    identifierIndex: index('verification_identifier_idx').on(table.identifier),
  })
)

export const passkeys = pgTable(
  'passkey',
  {
    id: text('id').primaryKey(),
    name: text('name'),
    publicKey: text('publicKey').notNull(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    credentialID: text('credentialID').notNull(),
    counter: integer('counter').notNull(),
    deviceType: text('deviceType').notNull(),
    backedUp: boolean('backedUp').notNull(),
    transports: text('transports'),
    createdAt: timestamp('createdAt', { mode: 'date' }),
    aaguid: text('aaguid'),
  },
  table => ({
    credentialUnique: uniqueIndex('passkey_credential_id_unique').on(table.credentialID),
    userIdIndex: index('passkey_user_id_idx').on(table.userId),
  })
)

export const user = users
export const account = accounts
export const session = sessions
export const verification = verifications
export const passkey = passkeys

export const share = pgTable('share', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  code: text('code'),
  file: jsonb('file').$type<string[]>().default([]),
  storageSize: bigint('storageSize', { mode: 'number' }).notNull().default(0),
  expireAt: timestamp('expireAt', { withTimezone: true }),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  userId: text('userId').references(() => users.id, { onDelete: 'cascade' }),
  ip: text('ip').notNull(),
  active: boolean('active').notNull().default(true),
})

export const logs = pgTable('logs', {
  id: serial('id').primaryKey(),
  ip: text('ip').notNull(),
  time: timestamp('time', { withTimezone: true }).notNull().defaultNow(),
  shareId: text('shareId').references(() => share.id),
  userId: text('userId').references(() => users.id),
})

export const nouns = pgTable('noun', {
  id: serial('id').primaryKey(),
  word: text('word').notNull().unique(),
})

export const adjectives = pgTable('adjectives', {
  id: serial('id').primaryKey(),
  word: text('word').notNull().unique(),
})
