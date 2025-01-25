import type { Application, Request, Response } from 'express';
import basicAuth from 'express-basic-auth';
import swaggerUI from 'swagger-ui-express';

import { ErrorHandlerMiddleware } from './error/error-handler.middleware';
import { NotFoundMiddleware } from './error/not-found.middleware';
import { Config } from '../../shared/utils/config/config';
import { swaggerSpec } from '../swagger/swagger';

class MiddlewareRegistrar {
  public static register(app: Application): void {
    const { NODE_ENV, SWAGGER_USERNAME, SWAGGER_PASSWORD } =
      Config.GetInstance().env;
    if (NODE_ENV === 'development') {
      app.use('/openapi', (_req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
      });
      app.use(
        '/api-docs',
        basicAuth({
          users: { [SWAGGER_USERNAME]: SWAGGER_PASSWORD },
          challenge: true,
        }),
        swaggerUI.serve,
        swaggerUI.setup(swaggerSpec),
      );
    }
    app.use(NotFoundMiddleware.handle);
    app.use(ErrorHandlerMiddleware.handle);
  }
}

export { MiddlewareRegistrar };
