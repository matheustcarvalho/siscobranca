import { Model, DataTypes } from 'sequelize';
import internal from 'stream';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
    
    
    login: string;
    nome: string;
    boletos_vencidos: number;
    protocolo: string;

}

export const User = sequelize.define<UserInstance>("User",{

    login: {
        type: DataTypes.STRING

    },

    nome: {
        type: DataTypes.STRING
    },

    boletos_vencidos: {
        type: DataTypes.INTEGER
    },

    protocolo: {
        type: DataTypes.STRING
    },


}, {
    tableName: 'view_cobranca_relatorio',
    timestamps: false
});