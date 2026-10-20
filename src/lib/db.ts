import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let cached: PrismaClient | undefined

function createClient(): PrismaClient | undefined {
  try {
    return new PrismaClient({ log: ['query'] })
  } catch {
    // The generated client is unavailable (e.g. `prisma generate` has not run
    // or its engine binary cannot be fetched on this host). Route handlers
    // fall back to their catalogue mocks when the client is missing.
    return undefined
  }
}

/**
 * Lazily-initialised Prisma client. Construction is deferred until the first
 * property access so importing this module never throws during static builds
 * on hosts where the Prisma engine has not been generated yet.
 */
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!cached) {
      cached = globalForPrisma.prisma ?? createClient()
      if (cached && process.env.NODE_ENV !== 'production') globalForPrisma.prisma = cached
    }
    if (!cached) {
      throw new Error('Prisma client is unavailable — run `prisma generate` to build it.')
    }
    return (cached as unknown as Record<string | symbol, unknown>)[prop]
  },
})
