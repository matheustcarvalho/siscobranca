import { Request, response, Response } from 'express';
import { Operador} from '../models/Operadores';
import { Parametros, ParametrosInstance } from '../models/Parametros';
import { Op, QueryTypes } from 'sequelize';
import { createHash } from 'crypto';



export const home = async (req: Request , res: Response ) => {


  const senhahash = createHash('md5').update(req.body.password).digest('hex');
 
 
   try { 

    const operadores = await Operador.findOne({

      raw:true,
      where: {
        login: req.body.login
      }

    })


    if(req.body.login == operadores?.login && senhahash == operadores?.senha){

      res.redirect('/home');
    }   else {
          
          res.render('pages/login', {
               
          });
  
    }
  } catch (e) {

    console.log(e)

  }

}



export const login = (req: Request , res: Response ) => {

    
    res.render('pages/login');

}



export const ipvalidation = async (req: Request , res: Response, next: Function ) => {

  let ipCliente = (req.socket.remoteAddress)
  ipCliente = ipCliente?.split(':').reverse()[0]

  try { 
    const parametro = await Parametros.findOne({
      raw:true,
      where: {
        atributo: 'IpAddress'
      }
    });

   const valor = parametro?.valor;
   const ips = valor?.split(',') || []
   const found = ips.find(ip => ipCliente == ip)

   if (!found)
    res.status(200).render('pages/restrito')
   next()    
  } catch (e) {
    res.status(401).send(e)
  }
  

}

export const validationlogin = async (req: Request, res: Response, next: Function) => {


  
}

