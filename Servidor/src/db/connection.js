import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// export const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'pw1213',
//     password: '',
//     // port: 3307
// });

export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'minisitec',
    password: 'minisitec',
    port: 3307
});

export const db = drizzle(connection);