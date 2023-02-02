import { Model, DataTypes } from 'sequelize';
import internal from 'stream';
import { sequelize } from '../instances/mysql';


export interface ClienteInstance extends Model {
    
    id:number;
    login: string;
    status_login: string;
    dia_vencimento: number;
    protocolo: number;
    classificacao: string;
    Atrasa_dias: number;
    pagou_atrasado: number;
    faturas_geradas: number;
    nome: string;
    id_cliente: number;
    solicitacao: string;
    boletos_vencidos: number;
    cidade:string;

}


export const Cliente = sequelize.define<ClienteInstance>("Cliente",{

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

    classificacao:{
        type: DataTypes.STRING
    },

    Atrasa_dias:{
        type: DataTypes.INTEGER
    },
    

    faturas_geradas:{
        type: DataTypes.INTEGER
    },

    pagou_atrasado:{
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
    tableName: 'view_sistema_de_cobranca',
    timestamps: false
});