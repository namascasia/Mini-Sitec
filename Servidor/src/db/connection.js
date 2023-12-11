import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'pw1213',
    password: '',
    // port: 3307
})
    .then(() => console.log('Base de datos conectada'))
    .catch(() => console.log('Error al conectar a la base de datos'));

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'minisitec',
//     password: 'minisitec',
//     port: 3307
// })

export const db = drizzle(connection);