import { Request, Response } from 'express';
import { create } from 'domain';
import { User } from '../models/User';

export const search = (req: Request, res: Response) => {

    let query: string = req.query.q as string;

    

    if(!query) {
        res.redirect('/home');
        return;
    }

    console.log(query);


}

