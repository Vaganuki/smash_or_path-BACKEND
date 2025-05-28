import { DataTypes, Sequelize    } from "sequelize";
import { History } from "../../@types/types";


export default (sequelize:Sequelize) =>{
    const historyModel = sequelize.define<History>(
        "history",
        {
            history_id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
            fight_id:{
                type:DataTypes.INTEGER,
                allowNull:false,
                references:{
                    model:"fight",
                    key: 'fight_id',
                }
            }
        },
        {
            tableName:"history",
            timestamps:"false",
        }
    );
    return historyModel;
};