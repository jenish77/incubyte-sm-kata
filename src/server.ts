import app from './app';
import config from './config';
import { getDb } from './db/connection';

async function start(): Promise<void> {
  // Initialize database
  await getDb();

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT} [${config.NODE_ENV}]`);
  });
}

start();
