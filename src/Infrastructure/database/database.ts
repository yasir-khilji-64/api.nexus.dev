import mongoose from 'mongoose';
import { Service } from 'typedi';

import { IDatabase } from '../../Application/interfaces';
import { Config } from '../config';
import { Logger } from '../logger';

@Service('DatabaseService')
class Database implements IDatabase {
  private static env = Config.GetInstance().env;
  private mongoURI: string;

  constructor() {
    const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE } =
      Database.env;
    this.mongoURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
  }

  public async connect(): Promise<void> {
    mongoose.connection.on('connected', () => {
      Logger.info('MongoDB Connected', Database.name, {});
    });
    mongoose.connection.on('disconnected', () => {
      Logger.debug('MongoDB Disconnected', Database.name, {});
    });
    mongoose.connection.on('reconnected', () => {
      Logger.info('MongoDB Reconnected', Database.name, {});
    });
    mongoose.connection.on('error', (error) => {
      Logger.error('MongoDB Connect Error', Database.name, { error });
    });
    mongoose.connection.on('close', () => {
      Logger.debug('MongoDB Connection Closed', Database.name, {});
    });

    try {
      await mongoose.connect(this.mongoURI);
    } catch (error) {
      Logger.error('MongoDB Connection Failed', Database.name, { error });
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      Logger.error('MongoDB Disconnect Error', Database.name, { error });
      throw error;
    }
  }

  public getConnectionStatus():
    | 'disconnected'
    | 'connected'
    | 'connecting'
    | 'disconnecting'
    | 'uninitialized' {
    const connectionState = mongoose.connection.readyState;
    const connectionStatus: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
      99: 'uninitialized',
    };
    return connectionStatus[connectionState] as
      | 'disconnected'
      | 'connected'
      | 'connecting'
      | 'disconnecting'
      | 'uninitialized';
  }
}

export { Database };
