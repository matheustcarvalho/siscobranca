import { Router } from 'express';
import * as PageController from '../controllers/pageController';
import * as SearchController from '../controllers/searchController';
const router = Router();

router.get('/login', PageController.login);
router.get('/', PageController.home);
router.get('/cobranca', PageController.cobranca);
router.get('/relatorio', PageController.relatorio);
router.get('/retornar',PageController.retornar);

router.get('search', SearchController.search);

export default router;