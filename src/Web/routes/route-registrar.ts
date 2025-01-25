import type { Application } from 'express';

import { DependencyInjectionContainer } from '../../Infrastructure/dependency-injection/dependency-injection.container';

class RouteRegistrar {
  public static register(app: Application): void {
    const indexRoute = DependencyInjectionContainer.getIndexRouteContainer();

    app.use('/', indexRoute.getRoutes());
  }
}

export { RouteRegistrar };
