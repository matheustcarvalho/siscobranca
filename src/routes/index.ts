import { Router } from 'express';
import * as PageController from '../controllers/pageController';
import * as SearchController from '../controllers/searchController';
import * as loginController from '../controllers/loginController';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
const router = Router();


// router.use(session({secret:'dasudas78dyas87df'}));
// router.use(bodyParser.urlencoded({extended:true}));

router.use(express.json());
router.use(express.urlencoded({extended:true}));


//validação de ip

router.use(loginController.ipvalidation);

//Sessão
router.use(session({secret:'secretkey123',
resave:true,
saveUninitialized:true
}))



//rotas
router.get('/restrito', loginController.ipvalidation)
router.get('/', loginController.login);
router.post('/', loginController.home);

router.get('/home', PageController.homeget);
router.post('/home', PageController.homepost);
router.get('/cobranca', PageController.cobranca);
router.get('/relatorio', PageController.relatorio);
router.get('/concluido',PageController.concluido);

router.get('search', SearchController.search);


export default router;
