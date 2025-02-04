import { Container } from 'typedi';

import { IndexRoute } from '../../Web/routes/index/index.route';

class DependencyInjectionContainer {
  static initialize(): void {
    // Optionally, manually register services here if they are not decorated with @Service().
    // Example:
    // Container.set('MyService', new MyService());
  }

  static getIndexRouteContainer(): IndexRoute {
    return Container.get(IndexRoute);
  }
}

export { DependencyInjectionContainer };
