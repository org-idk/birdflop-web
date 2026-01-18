import { type RequestHandler } from '@builder.io/qwik-city';
import { drizzle } from 'drizzle-orm/d1';
import { type AppDatabase, initializeDbIfNeeded } from '~/util/db';

export const onRequest: RequestHandler = async ({ platform }) => {
  const env = platform?.env as Env | undefined;
  if (env?.DB) {
    await initializeDbIfNeeded(initD1(env));
  } else {
    console.warn('DB binding not found in platform.env. Database features will be disabled.');
  }
};

function initD1(env: Env): () => Promise<AppDatabase> {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async () => drizzle(env.DB);
}