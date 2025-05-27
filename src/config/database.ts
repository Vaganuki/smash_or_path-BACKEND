import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();

console.log("DB_URL:", process.env.DB_URL);

const sequelize = new Sequelize(process.env.DB_URL as string, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});

export default sequelize;