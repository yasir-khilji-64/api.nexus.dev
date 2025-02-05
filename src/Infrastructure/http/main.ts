import 'reflect-metadata';

import { Container } from 'typedi';

import { app } from './app';
import type { IDatabase } from '../../Application/interfaces';
import { Config } from '../config';
import { Logger } from '../logger';

async function bootstrap(): Promise<void> {
  const env = Config.GetInstance().env;
  Logger.boot(env.NODE_ENV === 'development' ? 'DEBUG' : 'ERROR');
  const port = env.PORT;
  const database = Container.get<IDatabase>('DatabaseService');
  try {
    await database.connect();
    const server = app.listen(port, '0.0.0.0', () => {
      Logger.info(`Server: http://127.0.0.1:${port}`, bootstrap.name, {});
    });
    process.on('SIGINT', async () => {
      await database.disconnect();
      server.close((err?: Error) => {
        if (err) {
          throw err;
        }
        Logger.debug(`Server closed`, bootstrap.name, {});
        process.exit(0);
      });
    });
  } catch (error) {
    Logger.error('Bootstrap failed with error', bootstrap.name, { error });
    process.exit(1);
  }
}

bootstrap().catch((error: Error) => {
  Logger.error('Unhandled error', bootstrap.name, { error });
  process.exit(1);
});
