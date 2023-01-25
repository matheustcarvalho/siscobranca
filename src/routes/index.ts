import { Router } from 'express';
import * as PageController from '../controllers/pageController';
import * as SearchController from '../controllers/searchController';
import * as loginController from '../controllers/loginController';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
const router = Router();

router.use(session({secret:'dasudas78dyas87df'}));
router.use(bodyParser.urlencoded({extended:true}));

// router.use(express.json());
// router.use(express.urlencoded({extended:true}));

router.get('/', loginController.login);
router.post('/', loginController.home);

router.get('/home', PageController.home);
router.get('/cobranca', PageController.cobranca);
router.get('/relatorio', PageController.relatorio);
router.get('/concluido',PageController.concluido);

router.get('search', SearchController.search);


export default router;