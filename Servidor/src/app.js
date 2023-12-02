import { Server } from './server.js';
import env from 'dotenv';
env.config(__dirname, '../.env');


const server = new Server();

server.listen();