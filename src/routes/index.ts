import { Router } from 'express';
import * as PageController from '../controllers/pageController';
import * as loginController from '../controllers/loginController';
import express from 'express';
import session from 'express-session';
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
// const localStrategy = require('passport-local').Strategy
const router = Router();

type User = {
    id: string,
    login: string,
    name: string,
    group: string,
    sector: string
};

declare module "express-session" {
    interface SessionData {
        user: User
    }
}

//Sessão
router.use(session({
    secret: 'sistemacobranca',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 60000 * 20,
    }
}))

router.use(cookieParser());

router.use(flash())

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/teste/api', PageController.ApiTest);



//validação de ip

router.use(loginController.ipvalidation);
router.use(loginController.validationlogin);


//rotas
router.get('/restrito', loginController.restricted)
router.get('/', loginController.login);
router.get('/logout', loginController.logout);
router.post('/', loginController.home);

router.get('/atribuir', PageController.homeget);
router.post('/home', PageController.homepost);
router.post('/home', PageController.filtropost);
router.get('/cobranca', PageController.cobrancaget);
router.post('/cobranca', PageController.cobrancapost);
router.get('/relatorio', PageController.relatorio);
router.get('/agendamento', PageController.agendamentoget);
router.post('/agendamento', PageController.agendamentopost);
router.get('/index', PageController.index);



export default router;
