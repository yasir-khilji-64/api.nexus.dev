import { Router } from 'express';
import { Inject, Service } from 'typedi';

import { IndexController } from '../../controllers/index/index.controller';

@Service()
class IndexRoute {
  private readonly router: Router;

  constructor(@Inject() private indexController: IndexController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @openapi
     * /:
     *  get:
     *    summary: Root endpoint
     *    description: Returns the base API message
     *    tags:
     *      - Index
     *    responses:
     *      200:
     *        description: Successful response
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/MessageResponseDto'
     *      500:
     *        description: Internal Server Error
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponseDto'
     */
    this.router.get('/', this.indexController.index.bind(this.indexController));

    /**
     * @openapi
     * /health-check:
     *  get:
     *    summary: Health Check Endpoint
     *    description: Returns the base API message
     *    tags:
     *      - Index
     *    responses:
     *      200:
     *        description: Health check successful
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/HealthCheckResponseDto'
     *      503:
     *        description: Service unavailable
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/HealthCheckResponseDto'
     *      500:
     *        description: Internal Server Error
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ErrorResponseDto'
     */
    this.router.get(
      '/health-check',
      this.indexController.healthCheck.bind(this.indexController),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export { IndexRoute };
