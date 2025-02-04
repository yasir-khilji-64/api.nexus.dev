import { Router } from 'express';
import { Inject, Service } from 'typedi';

import { IndexController } from '../../controllers/index/index.controller';

@Service()
class IndexRoute {
  private readonly router: Router;

  constructor(@Inject() private readonly indexController: IndexController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.indexController.index.bind(this.indexController));
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export { IndexRoute };
