import { Model, DataTypes } from 'sequelize';
import internal from 'stream';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
    
    id:number;
    login: string;
    status_login: string;
    dia_vencimento: number;
    protocolo: number;
    nome: string;
    id_cliente: number;
    solicitacao: string;
    boletos_vencidos: number;
    cidade:string;


}


export interface BoletoInstance extends Model {

    id: number;
    id_adesao: number;
    dataVencimento: Date;
    valorBoleto: number;
    status: string;
    valor_pago: number;
    data_pagamento: Date;


}

export const User = sequelize.define<UserInstance>("User",{

    id: {
       primaryKey: true,
       type: DataTypes.INTEGER
    },

    login: {
        type: DataTypes.STRING

    },

    status_login: {
        type: DataTypes.STRING

    },

    dia_vencimento:{
        type: DataTypes.INTEGER
    },

    protocolo:{
        type: DataTypes.INTEGER
    },

    nome:{
        type: DataTypes.STRING
    },

    id_cliente:{
        type: DataTypes.INTEGER
    },

    solicitacao:{
        type: DataTypes.STRING
    },

    boletos_vencidos:{
        type: DataTypes.INTEGER
    },

    cidade:{
        type: DataTypes.STRING
    },




}, {
    tableName: 'view_cobranca_relatorio',
    timestamps: false
});


export const Boleto = sequelize.define<BoletoInstance>("Boleto",{ 

    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_adesao: {
        type: DataTypes.INTEGER
    },
    dataVencimento: {
        type: DataTypes.DATE
    },
    valorBoleto: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
    valor_pago: {
        type: DataTypes.INTEGER
    },
    data_pagamento: {
        type: DataTypes.DATE
    },


},{
    tableName: 'boleto_cobranca',
    timestamps:false
});


// User.belongsTo(Boleto, {foreignKey: ''})