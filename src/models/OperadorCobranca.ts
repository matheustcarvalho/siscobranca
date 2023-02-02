import { Model, DataTypes } from 'sequelize';
import internal from 'stream';
import { sequelize } from '../instances/mysql';


export interface OperadorCobrancaInstance extends Model {
    
    id:number;
    nome: string;

}


export const OpCobranca = sequelize.define<OperadorCobrancaInstance>("OpCobranca",{

    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
     },
 
     nome: {
         type: DataTypes.STRING
 
     }

}, {
    tableName: 'cob_operadores',
    timestamps: false
});