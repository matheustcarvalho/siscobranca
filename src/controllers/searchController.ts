import { Request, Response } from 'express';
import { create } from 'domain';
import { User } from '../models/User';

export const search = (req: Request, res: Response) => {

    let query: string = req.query.q as string;

    // let list = User.(query)

    if(!query) {
        res.redirect('/home');
        return;
    }

    console.log(query);


}

//exemplo join


//    const users = await User.findAll({


//     raw:true,

//     include:[{
//       model: Boleto,
//       required: false,
//       attributes:['dataVencimento', 'data_pagamento']
      
//     }],

//      where:{
//                 [Op.and]: [
//           sequelize.literal("boletos_vencidos >= 3  and nome like 'a%'")]

//      },

//     group:['login']
//      }).catch(err => console.log(err));