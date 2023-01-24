import { Request, Response } from 'express';
import { create } from 'domain';

export const search = (req: Request, res: Response) => {

    let query: string = req.query.q as string;

    if(!query) {
        res.redirect('/');
        return;
    }

    console.log(query);


}