import { request, Request, response, Response } from 'express';
const axios = require('axios');



export const homeget = async (req: Request, res: Response, next: Function) => {


  try {

    var grupo_user = req.session.user?.group

    var grupoUsuario = Number(grupo_user);

    var grupo = 1


    if (grupoUsuario !== grupo) {

      res.render('pages/restrito')

    } else {

      res.render('pages/atribuir', {

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

  console.log(req.body)


  const resposta = await axios({
    method: 'post',
    url: 'http://localhost:8888/integra/apis/sis-cobranca/salvar-atribuicao',
    data: {
      clientes: cliente,
      operador: operador,
      atribuiuId: atribuiuId
    }

  })

  res.sendStatus(200)

}

export const cobrancaget = async (req: Request, res: Response) => {

  
  let page: any = req.query.page
  page = Number(page)

  if (!page) {
    page = 1
  }

  try {

    // const CobcurrentUrl = req.baseUrl;
    // const next = page + 1
    // const previous = page - 1
    // const nexturl: any = `${CobcurrentUrl}?page=${next}`;
    // const previousurl: any = `${CobcurrentUrl}?page=${previous}`;

    // const response = await axios.get('http://integra2hm.micron.com.br/integra/apis/sis-cobranca/listar-clientes-atribuidos')
    // const clientes = response.data.clientes
    // const pageapi = page
    // const respons = await axios.get(`http://integra2hm.micron.com.br/integra/apis/sis-cobranca/listar-clientes-atribuidos?page=${pageapi}&limit=40`)
    // const cliente = respons.data.clientes


    //-paginação




    res.render('pages/cobranca', {


    });
  } catch (err) {
    console.log(err);
  }


}

export const cobrancapost = async (req: Request, res: Response) => {


  var idOperador = req.session.user?.id



  var cliente = req.body

  console.log(cliente)



  const resposta = await axios({
    method: 'post',
    url: 'http://localhost:8888/integra/apis/sis-cobranca/salvar-cobranca',
    data: {
      cliente: cliente,
      operador: idOperador
    }

  })

  res.sendStatus(200)

}


export const relatorio = (req: Request, res: Response) => {


  res.render('pages/relatorio');

}




export const agendamentoget = (req: Request, res: Response) => {



  res.render('pages/agendamento');

}

export const agendamentopost = async (req: Request, res: Response) => {
  

  var idOperador = req.session.user?.id

  var cliente = req.body

  console.log(cliente);


  const resposta = await axios({
    method: 'post',
    url: 'http://localhost:8888/integra/apis/sis-cobranca/salvar-agendamento',
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

  console.log(cliente);


  const resposta = await axios({
    method: 'post',
    url: 'http://localhost:8888/integra/apis/sis-cobranca/atualizar-agendamento',
    data: {
      clientes: cliente,
      operador: idOperador
    }

  })

  res.sendStatus(200)



  

}

export const index = async (req: Request, res: Response) => {



  // const total = await axios.get('http://localhost:8888/integra/apis/sis-cobranca/listar-clientes')

  // const totalclientes = total.data.pagination.total

  // const atribuidos = await axios.get('http://localhost:8888/integra/apis/sis-cobranca/listar-clientes-atribuidos')

  // const clientes_atribuidos = atribuidos.data.pagination.total





  res.render('pages/index', {
    // totalclientes,
    // clientes_atribuidos

  })

}



