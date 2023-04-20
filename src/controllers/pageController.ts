import { request, Request, response, Response } from 'express';
const axios = require('axios');
import dotenv from 'dotenv';
const http = require('http');
const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = require('path');
dotenv.config();

const url = process.env.API_URL


export const homeget = async (req: Request, res: Response, next: Function) => {


  try {

    const parametro = await axios.get(`${url}/apis/sis-cobranca/permissao-parametro`)

    const horaget = await axios.get(`${url}/apis/sis-cobranca/hora-script`)
    var horaScript = horaget.data.hora[0].valor
    var hora = horaScript.split(' ')[1]
    
  
    

    var parametroPermissao = parametro.data

    // var grupo_user = req.session.user?.group
    var id_user = req.session.user?.id
    // var grupoUsuario = Number(grupo_user);
    // var grupo = 1

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


    if (parametroPermissao.includes(id_user)){

      res.render('pages/atribuir', {
        url,
        nomelogin,
        texto,
        hora
      });

    } else {

      res.render('pages/restrito')
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

  }).then(function (response: any) {
    res.sendStatus(200)
    console.log(response.data);

  }).catch(function (error: any) {
    console.log(error);
  });

  

}

export const cobrancaget = async (req: Request, res: Response) => {
  
  try{
    
  var sessionName = req.session.user?.name
  var id_usuario = req.session.user?.id
  const horaget = await axios.get(`${url}/apis/sis-cobranca/hora-script`)
  var horaScript = horaget.data.hora[0].valor
  var hora = horaScript.split(' ')[1]


  // console.log(id_usuario);

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
    res.render('pages/cobranca', {
      url,
      nomelogin,
      texto,
      id_usuario,
      hora
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
  }).then(function (response: any) {

  console.log(response.data)
  res.sendStatus(200)

}).catch(function (error: any) {
  console.log(error);
});

}


export const filtropost = async (req: Request, res: Response) => {

  const resposta = await axios({
    method: 'post',
    url: `${url}/apis/sis-cobranca/listar-clientes`,
    data: {

    }

  }).then(function (response: any) {

  console.log(response.data)

  res.sendStatus(200)

  }).catch(function (error: any) {
    console.log(error);
  });

}


export const relatorio = (req: Request, res: Response) => {


  res.render('pages/relatorio', {
    url
  });

}


export const agendamentoget = async (req: Request, res: Response) => {

try{
  const horaget = await axios.get(`${url}/apis/sis-cobranca/hora-script`)
  var horaScript = horaget.data.hora[0].valor
  var hora = horaScript.split(' ')[1]

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
    texto,
    hora
  });

} catch (e) {

  console.log(e);
}


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

  }).then(function (response: any) {
  console.log(response.data);
  res.sendStatus(200)
  }).catch(function (error: any) {
    console.log(error);
  });


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

  }).then(function (response: any) {
    
  console.log(response.data);

  res.sendStatus(200)

  }).catch(function (error: any) {
    console.log(error);
  });


}

export const index = async (req: Request, res: Response) => {

try{
  const horaget = await axios.get(`${url}/apis/sis-cobranca/hora-script`)
  var horaScript = horaget.data.hora[0].valor
  var hora = horaScript.split(' ')[1]

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
    texto,
    hora
  })


} catch (e) {
  console.log(e);
}


}

export const ApiTest = async (req: Request, res: Response) => {

  res.setHeader('Content-Type', 'application/json');
  // console.log(req.ip);
  res.end(JSON.stringify({
    ip1: req.ip,
    ip2: req.socket.remoteAddress,
    ip3: req.headers['x-forwarded-for'] || null,
    ip4: req.connection.remoteAddress
  }));

}

export const exportarCSV = async (req: Request, res: Response) => {

  try {
    
    const list = await axios.get(`${url}/apis/sis-cobranca/listar-clientes-CSV`)

    var data = list.data.clientes

    const csv = json2csv(data);
    const filename = 'listagem.csv';
    const filepath = path.join(__dirname, filename);
  
    fs.writeFile(filepath, csv, function(err:any) {
      if (err) throw err;
      res.download(filepath, function(err) {
        if (err) throw err;
        fs.unlinkSync(filepath);
      });
    })


  } catch (e) {
    console.log(e);
  }

}