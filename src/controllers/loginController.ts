import { Request, response, Response } from 'express';
import { Operador } from '../models/Operadores';
import { Parametros, ParametrosInstance } from '../models/Parametros';
import session from 'express-session';
const axios = require('axios');
const flash = require('connect-flash');
const crypto = require('crypto');




export const home = async (req: Request, res: Response) => {  

  var loginn = req.body.login
  var passwordd = req.body.password

  const resposta = await axios({
    method: 'post',
    url: 'http://integra2hm.micron.com.br/integra/api/login',
    data: {
      login: loginn,
      password: passwordd
    }

  }).then(function (response: any) {

    console.log(response.data);
    if (response.data.success == true) {
      const userData = response.data.data
      const session = req.session
      session.user = userData
      console.log(session);

      // renderIndex(res)
      res.redirect('/index')
    } else {
      res.render('pages/login')
    }

  }).catch(function (error: any) {
    console.log(error);
  });




}



export const login = (req: Request, res: Response) => {
  res.render('pages/login')
}

export const logout = async (req: Request, res: Response) => {
  req.session.destroy(console.log)
  res.redirect('/')
}



export const ipvalidation = async (req: Request, res: Response, next: Function) => {

  // console.log(req.session);

  try {

    const parametro = await axios.get('http://integra2hm.micron.com.br/integra/apis/sis-cobranca/buscar-ip')

    let ipCliente = (req.socket.remoteAddress)
    ipCliente = ipCliente?.split(':').reverse()[0]
    var hash = crypto.createHash('md5').update(ipCliente).digest('hex');

    const valores = parametro.data

    let found = valores.includes(hash);

    if (!found)
      res.status(200).render('pages/restrito')
    next()
  } catch (e) {
    res.status(401).send(e)
  }


}

export const validationlogin = async (req: Request, res: Response, next: Function) => {
  var sessao = req.session
  if (req.url == '/' || sessao?.user?.id) {
    next()
  } else {
    res.redirect('/')
  }
}

const renderIndex = async (res: Response) => {
  const total = await axios.get('http://integra2hm.micron.com.br/integra/apis/sis-cobranca/listar-clientes')
  const totalclientes = total.data.pagination.total
  const atribuidos = await axios.get('http://integra2hm.micron.com.br/integra/apis/sis-cobranca/listar-clientes-atribuidos')
  const clientes_atribuidos = atribuidos.data.pagination.total

  res.render('pages/index', {
    totalclientes,
    clientes_atribuidos
  });
}