import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import internal from 'stream';
import { sequelize } from '../instances/mysql';


export interface ParametrosInstance extends Model<InferAttributes<ParametrosInstance>, InferCreationAttributes<ParametrosInstance>> {
    
    id:CreationOptional<number>;
    operacao: string;
    atributo: string;
    valor: string;

}


export const Parametros = sequelize.define<ParametrosInstance>("Parametros",{

    id: {
       primaryKey: true,
       type: DataTypes.INTEGER,
       allowNull: false
    },

    operacao: {
        type: DataTypes.STRING,
        allowNull: false

    },

    atributo: {
        type: DataTypes.STRING,
        allowNull: false

    },

    valor:{
        type: DataTypes.STRING,
        allowNull: false
    }


}, {
    tableName: 'parametros',
    timestamps: false
});