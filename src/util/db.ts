import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type * as DatabaseSchema from '../../drizzle/schema';

export * from '../../drizzle/schema';

export type AppDatabase = DrizzleD1Database<typeof DatabaseSchema>;

let _db: AppDatabase;

export function getDB() {
  return _db;
}

export async function initializeDbIfNeeded(
  factory: () => Promise<AppDatabase>,
) {
  if (!_db) _db = await factory();
}