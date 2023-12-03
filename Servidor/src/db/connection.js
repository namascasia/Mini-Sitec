import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';


// !TODO: FIX ENV VARIABLES
const user = process.env.DATABASE_USER;
const database = process.env.DATABASE_NAME;
const password = process.env.DATABASE_PASSWORD;
const port = process.env.DATABASE_PORT;

export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'minisitec',
    password: 'minisitec',
    port: 3307
});

export const db = drizzle(connection);