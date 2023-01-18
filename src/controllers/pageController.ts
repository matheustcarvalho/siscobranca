import { Request, Response } from 'express';
import { User } from '../models/User';
import { Op } from 'sequelize';

//[Op.gt] = >
//[Op.gte] = >=
//[Op.lt] = <
//[Op.lte] = <=

export const home = async (req: Request, res: Response) => {

     const users = await User.findAll({
        where:{
            nome: {
                [Op.like]: 'andre carvalho moreira%'
                
            }
        }
    });
    // console.log("USUARIOS: ", JSON.stringify(users));


    res.render('pages/home', {
        users
    });
        

}

export const cobranca = (req: Request, res: Response) => {

    res.render('pages/cobranca');

}

export const relatorio = (req: Request, res: Response) => {


    res.render('pages/relatorio');

}

export const login = (req: Request, res: Response) => {

    

    res.render('pages/login');

}