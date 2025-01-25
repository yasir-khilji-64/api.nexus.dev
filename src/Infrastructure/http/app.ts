import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';

import { RouteRegistrar } from '../../Web/routes/route-registrar';
import { DependencyInjectionContainer } from '../dependency-injection/dependency-injection.container';
import { MiddlewareRegistrar } from '../middlewares/middleware-registrar';

const app = express();

DependencyInjectionContainer.initialize();

app.use(cors());
app.use(helmet());
app.use(json());

RouteRegistrar.register(app);
MiddlewareRegistrar.register(app);

export { app };
