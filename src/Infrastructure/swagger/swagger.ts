import type { Options, SwaggerDefinition } from 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';

import ErrorResponseDto from './schemas/ErrorResponseDto.schema.json';
import HealthCheckResponseDto from './schemas/HealthCheckResponseDto.schema.json';
import MessageResponseDto from './schemas/MessageResponseDto.schema.json';
import { version, description } from '../../../package.json';
import { Config } from '../../shared/utils/config/config';

const env = Config.GetInstance().env;

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Nexus Cloud',
    version,
    description,
  },
  servers: [
    {
      url: `http://127.0.0.1:${env.PORT}`,
      description: 'Development Server',
    },
  ],
  tags: [
    {
      name: 'Index',
      description: 'Index endpoints for api',
    },
  ],
  components: {
    schemas: {
      MessageResponseDto,
      ErrorResponseDto,
      HealthCheckResponseDto,
    },
  },
};

const options: Options = {
  swaggerDefinition,
  apis: ['./src/Web/routes/**/*.route.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
