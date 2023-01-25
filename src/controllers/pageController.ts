import { Request, Response } from 'express';
import { User, Boleto } from '../models/User';
import { Op, QueryTypes } from 'sequelize';
import sequelize from 'sequelize';


//[Op.gt] = >
//[Op.gte] = >=
//[Op.lt] = <
//[Op.lte] = <=

export const home = async (req: Request, res: Response) => {


   const users = await User.findAll({

    raw:true,

    include:[{
      model: Boleto,
      required: false,
      attributes:['dataVencimento', 'data_pagamento']
      
    }],

     where:{
                [Op.and]: [
          sequelize.literal("boletos_vencidos >= 3  and nome like 'a%'")]

     },

    group:['login']
     }).catch(err => console.log(err));


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