import { Router } from 'express';
import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js';
import authController from './controllers/authController.js';
import { isAuth } from './middlewares/authMiddleware.js';

const routes = Router();

routes.use(homeController);
routes.use('/movies', movieController);
routes.use('/cast', isAuth, castController);
routes.use('/auth', authController)

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;
