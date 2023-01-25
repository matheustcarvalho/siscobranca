import { Request, response, Response } from 'express';
import { Operador} from '../models/Operadores';
import { Op, QueryTypes } from 'sequelize';
import sequelize from 'sequelize';
import  Express  from 'express';
import { appendFile } from 'fs';


const usuario = 'admin';
const password = 'admin123';


export const home = (req: Request , res: Response ) => {


  if(req.body.password == password && req.body.login == usuario) {

    res.redirect('/home');
  }   else {

    res.render('pages/login', {
             
    });
  } 
        
    
        // res.render('pages/login', {
             
        // });


}


export const login = (req: Request, res: Response) => {

    
    res.render('pages/login');

}