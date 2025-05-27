import { Client } from 'pg';

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

client.connect()
    .then(() => console.log(`Database connected on port ${client.port}`))
    .catch((err: any) => console.log('Error while trying to connect to DB', err));

export default client;