import { Request, Response } from 'express';
import { User, Boleto } from '../models/User';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';

//[Op.gt] = >
//[Op.gte] = >=
//[Op.lt] = <
//[Op.lte] = <=

export const home = async (req: Request, res: Response) => {


   const users = await User.findAll({
        where: {
            [Op.and]: [
                sequelize.literal("boletos_vencidos >= 3 and nome like 'a%' ")
            ]
        }
     }).catch(err => console.log(err));


    // const boletos = await Boleto.findAll({
    //     where: {
    //         [Op.and]: [
    //             sequelize.literal("")
    //         ]
    //     }
    //  }).catch(err => console.log(err));



    res.render('pages/home', {
         users,
         
        
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

export const concluido = (req: Request, res: Response) => {

    

    res.render('pages/concluido');

}