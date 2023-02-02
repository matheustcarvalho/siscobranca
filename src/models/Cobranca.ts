import { Model, DataTypes } from 'sequelize';
import { PrimaryKey } from 'sequelize-typescript';
import internal from 'stream';
import { sequelize } from '../instances/mysql';

export interface CobrancaInstance extends Model {

    id:number;
    id_cliente:number,
    id_adesao:number,
    operador_id:number,
    login:string,
    data_cobranca:string,
    // operador_nome:string,
    numero_cobranca:number,
    comentario:string


}

export const Cobranca = sequelize.define<CobrancaInstance>("Cobranca",{

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
     },
     id_cliente: {
         type: DataTypes.INTEGER
 
    },
     id_adesao: {
        type: DataTypes.INTEGER

    },
    operador_id: {
        type: DataTypes.INTEGER

    },
    login: {
        type: DataTypes.STRING

    },
    data_cobranca: {
        type: DataTypes.DATE

    },
    // operador_nome: {
    //     type: DataTypes.STRING

    // },
    numero_cobranca: {
        type: DataTypes.INTEGER

    },
    comentario: {
        type: DataTypes.STRING

    },

}, {
    tableName: 'cob_cobrancas',
    timestamps: false
});