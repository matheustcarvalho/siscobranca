import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {



    res.render('pages/home');

}

export const cobranca = (req: Request, res: Response) => {

    res.render('pages/cobranca');

}

export const relatorio = (req: Request, res: Response) => {


    

    res.render('pages/relatorio');

}