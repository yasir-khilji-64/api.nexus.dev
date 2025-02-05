import { Container } from 'typedi';

import type { IDatabase } from '../../Application/interfaces';
import { IndexRoute } from '../../Web/routes/index/index.route';
import { Database } from '../database/database';

class DependencyInjectionContainer {
  static initialize(): void {
    // Optionally, manually register services here if they are not decorated with @Service().
    // Example:
    // Container.set('MyService', new MyService());
    Container.set<IDatabase>('DatabaseService', new Database());
  }

  static getIndexRouteContainer(): IndexRoute {
    return Container.get(IndexRoute);
  }
}

export { DependencyInjectionContainer };
