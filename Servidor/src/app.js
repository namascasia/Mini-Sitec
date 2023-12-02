import { Server } from './server.js';
import env from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config(__dirname, '../.env');


const server = new Server();

server.listen();