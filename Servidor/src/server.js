import express from 'express';
import cors from 'cors';
import { StudentsRouter } from './routes';

export class Server {

    constructor() {
        this.app = express();
        this.paths = {
            students: '/api/students',
            teachers: '/api/teachers',
        }
        this.port = 3000;

        this.middlewares();

        this.routes();

        this.initDb();
    }

    routes() {
        this.app.use(this.paths.students, StudentsRouter);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    initDb() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port ${this.port}`);
        });
    }
}