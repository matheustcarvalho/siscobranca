import { Model, DataTypes } from 'sequelize';
import internal from 'stream';
import { sequelize } from '../instances/mysql';

export interface OperadorInstance extends Model {
    
    id:number;
    login: string;
    senha: string;

}


export const Operador = sequelize.define<OperadorInstance>("Operador",{

    id: {
       primaryKey: true,
       type: DataTypes.INTEGER
    },

    login: {
        type: DataTypes.STRING,
        unique:true

    },

    senha: {
        type: DataTypes.STRING
    }
},{

    tableName: 'operador',
    timestamps: false

});