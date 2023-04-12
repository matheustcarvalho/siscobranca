import { request, Request, response, Response } from 'express';
const axios = require('axios');
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.API_URL


export const homeget = async (req: Request, res: Response, next: Function) => {


  try {

    var grupo_user = req.session.user?.group

    var grupoUsuario = Number(grupo_user);

    var grupo = 1

    var sessionName = req.session.user?.name;

    var nomelogin4 = sessionName?.split('-')[0].split(' ')[0]
    var nomelogin3 = nomelogin4?.toUpperCase()[0]
    var nomelogin2: any = nomelogin4?.substring(1).toLowerCase()
    var nomelogin = nomelogin3?.concat(nomelogin2)


    const date = new Date().toLocaleTimeString("pt-Br",{
      timeZone: "America/Sao_Paulo"
    });

    if (date >= '06:00:00' && date < '12:00:00') {

      var texto = 'Bom dia'

    } else if (date >= '12:00:00' && date < '18:00:00') {
      texto = 'Boa tarde'
    } else {
      texto = 'Boa noite'
    }


    if (grupoUsuario !== grupo) {

      res.render('pages/restrito')

    } else {

      res.render('pages/atribuir', {
        url,
        nomelogin,
        texto
      });
    }


  } catch (err) {
    console.log(err);
  }


}

export const homepost = async (req: Request, res: Response) => {


  var cliente = req.body.clientes
  var operador = req.body.operador
  var atribuiuId = req.session.user?.id



  const resposta = await axios({
    method: 'post',
    url: `${url}/apis/sis-cobranca/salvar-atribuicao`,
    data: {
      clientes: cliente,
      operador: operador,
      atribuiuId: atribuiuId,

    }

  })

  res.sendStatus(200)

}

export const cobrancaget = async (req: Request, res: Response) => {

  var sessionName = req.session.user?.name;

  var nomelogin4 = sessionName?.split('-')[0].split(' ')[0]
  var nomelogin3 = nomelogin4?.toUpperCase()[0]
  var nomelogin2: any = nomelogin4?.substring(1).toLowerCase()
  var nomelogin = nomelogin3?.concat(nomelogin2)

  const date = new Date().toLocaleTimeString("pt-Br",{
    timeZone: "America/Sao_Paulo"
  });

  if (date >= '06:00:00' && date < '12:00:00') {

    var texto = 'Bom dia'

  } else if (date >= '12:00:00' && date < '18:00:00') {
    texto = 'Boa tarde'
  } else {
    texto = 'Boa noite'
  }

  try {

    res.render('pages/cobranca', {
      url,
      nomelogin,
      texto
    });
  } catch (err) {
    console.log(err);
  }


}

export const cobrancapost = async (req: Request, res: Response) => {


  var idOperador = req.session.user?.id
  var nomeOperador = req.session.user?.name
  var loginOperador = req.session.user?.login


  var cliente = req.body


  const resposta = await axios({
    method: 'post',
    url: `${url}/apis/sis-cobranca/salvar-cobranca`,
    data: {
      cliente: cliente,
      operador: idOperador,
      nome: nomeOperador,
      login: loginOperador
    }

  })

  res.sendStatus(200)

}


export const filtropost = async (req: Request, res: Response) => {


  const resposta = await axios({
    method: 'post',
    url: `${url}/apis/sis-cobranca/listar-clientes`,
    data: {

    }

  })

  res.sendStatus(200)

}


export const relatorio = (req: Request, res: Response) => {


  res.render('pages/relatorio', {
    url
  });

}


export const agendamentoget = (req: Request, res: Response) => {

  var sessionName = req.session.user?.name;

  var nomelogin4 = sessionName?.split('-')[0].split(' ')[0]
  var nomelogin3 = nomelogin4?.toUpperCase()[0]
  var nomelogin2: any = nomelogin4?.substring(1).toLowerCase()
  var nomelogin = nomelogin3?.concat(nomelogin2)


  const date = new Date().toLocaleTimeString("pt-Br",{
    timeZone: "America/Sao_Paulo"
  });

  if (date >= '06:00:00' && date < '12:00:00') {

    var texto = 'Bom dia'

  } else if (date >= '12:00:00' && date < '18:00:00') {
    texto = 'Boa tarde'
  } else {
    texto = 'Boa noite'
  }


  res.render('pages/agendamento', {
    url,
    nomelogin,
    texto
  });

}

export const agendamentopost = async (req: Request, res: Response) => {


  var idOperador = req.session.user?.id

  var cliente = req.body


  const resposta = await axios({
    method: 'post',
    url: `${url}/apis/sis-cobranca/salvar-agendamento`,
    data: {
      clientes: cliente,
      operador: idOperador
    }

  })

  res.sendStatus(200)


}

export const agendamentoput = async (req: Request, res: Response) => {

  var idOperador = req.session.user?.id

  var cliente = req.body



  const resposta = await axios({
    method: 'post',
    url: `${url}/apis/sis-cobranca/atualizar-agendamento`,
    data: {
      clientes: cliente,
      operador: idOperador
    }

  })

  res.sendStatus(200)


}

export const index = async (req: Request, res: Response) => {

  var sessionName = req.session.user?.name;

  var nomelogin4 = sessionName?.split('-')[0].split(' ')[0]
  var nomelogin3 = nomelogin4?.toUpperCase()[0]
  var nomelogin2: any = nomelogin4?.substring(1).toLowerCase()
  var nomelogin = nomelogin3?.concat(nomelogin2)

  const date = new Date().toLocaleTimeString("pt-Br",{
    timeZone: "America/Sao_Paulo"
  });

  if (date >= '06:00:00' && date < '12:00:00') {

    var texto = 'Bom dia'

  } else if (date >= '12:00:00' && date < '18:00:00') {
    texto = 'Boa tarde'
  } else {
    texto = 'Boa noite'
  }

  res.render('pages/index', {
    url,
    nomelogin,
    texto
  })

}

export const ApiTest = async (req: Request, res: Response) => {

  res.setHeader('Content-Type', 'application/json');
  // console.log(req.ip);
  res.end(JSON.stringify({
    ip1: req.ip,
    ip2: req.socket.remoteAddress,
    ip3: req.headers['x-forwarded-for'] || null
  }));

}



