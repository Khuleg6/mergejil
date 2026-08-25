import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
    });
  }
  return pool;
}

export async function initializeSchema(): Promise<void> {
  const client = await getPool().connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        grade VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS assessment_results (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        mbti_type VARCHAR(10),
        mbti_answers JSONB,
        iq_score INTEGER,
        iq_answers JSONB,
        skills_scores JSONB,
        skills_answers JSONB,
        completed_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `);
  } finally {
    client.release();
  }
}
