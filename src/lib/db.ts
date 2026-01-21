import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Try DATABASE_URL, then fallback to Vercel/Neon specific variables
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL

  if (!connectionString) {
    throw new Error("DATABASE_URL (or fallback) is not defined in environment variables")
  }

  // Check if we are running locally to avoid forcing SSL on local DBs
  const isLocal = connectionString.includes("localhost") || connectionString.includes("127.0.0.1");

  const pool = new Pool({ 
    connectionString,
    // Neon and most production Postgres require SSL
    ssl: isLocal ? false : { rejectUnauthorized: false },
    // Connection pool settings
    max: 10,
    min: 0,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 5000,
  })
  
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
