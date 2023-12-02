import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const user = process.env.DATABASE_USER;
const database = process.env.DATABASE_NAME;
const password = process.env.DATABASE_PASSWORD;
const port = process.env.DATABASE_PORT

const conecction = mysql.createPool({
    host: 'localhost',
    user,
    database,
    password,
    port
});

export const db = drizzle(conecction);