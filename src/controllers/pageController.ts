import { request, Request, response, Response } from 'express';
import { User, Boleto } from '../models/User';
import { Cobranca } from '../models/Cobranca';
import { Op, QueryTypes } from 'sequelize';
import sequelize from 'sequelize';
import { Cliente } from '../models/Clientes';
import { OpCobranca } from '../models/OperadorCobranca';
import { off } from 'process';
import { count } from 'console';



//[Op.gt] = >
//[Op.gte] = >=
//[Op.lt] = <
//[Op.lte] = <=



export const homeget = async (req: Request, res: Response) => {



    //Paginação


    let offset:any =  req.query.offset
    let limit:any = req.query.limit
    limit = Number(limit)
    offset = Number(offset)

    if(!limit){
        limit = 20
      }
    
    
      if(!offset){
        offset = 0
      }

    //Query

    try{
    const clientes = await Cliente.findAndCountAll({
       raw:true,
       where:{
        
            cobranca: {
                [Op.is]:null
            }
        
       },
       order: [
        ['boletos_vencidos', 'DESC'],
        ['nome', 'ASC']
       ],
       limit: limit,
       offset: offset

    })


    const opcobranca = await OpCobranca.findAll({raw:true}).catch(err => console.log(err));

    //fimQuey

     //paginação
    const totalclientes:any = clientes?.count
    const currentUrl = req.baseUrl

    const next =  offset + limit
    const nexturl:any =  next < totalclientes ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset-limit;
    const previousurl:any = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}`: null;


    res.render('pages/home', {
        
         clientes,
         totalclientes,
         previousurl,
         nexturl,
         opcobranca

    });  
    }catch (err) {
        console.log(err);
  }
  
  
//   (err => console.log(err));}

    
 

}

export const homepost = async (req: Request, res: Response) => {

    const cobranca = await Cobranca.create({
      
        id_cliente: req.body.id_cliente,
        id_adesao: req.body.id_adesao,
        operador_id: req.body.operador_id,
        login: req.body.login,
        data_cobranca:req.body.data_cobranca,
        numero_cobranca: req.body.numero_cobranca,
        comentario: req.body.comentario

 
     }).catch(err => console.log(err));

    res.sendStatus(200);
}

export const cobranca = (req: Request, res: Response) => {

    res.render('pages/cobranca');

}

export const relatorio = (req: Request, res: Response) => {


    res.render('pages/relatorio');

}




export const concluido = (req: Request, res: Response) => {

    

    res.render('pages/concluido');

}



