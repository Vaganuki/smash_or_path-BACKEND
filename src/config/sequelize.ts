import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DB_NAME || 'your_db',
    process.env.DB_USER || 'your_user',
    process.env.DB_PASSWORD || 'your_password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false
    }
);