import express from 'express';
import cors from 'cors';
import { routers } from './routes/index.js';

export class Server {

    constructor() {
        this.app = express();
        this.paths = {
            students: '/api/students',
            teachers: '/api/teachers',
            subjects: '/api/subjects',
            groups: '/api/groups',
            inscribe: '/api/inscribe'
        };

        this.port = 3000;

        this.middlewares();

        this.routes();
    }

    routes() {
        this.app.use(this.paths.students, routers.studentsRouter);
        this.app.use(this.paths.teachers, routers.teachersRouter);
        this.app.use(this.paths.subjects, routers.subjectsRouter);
        this.app.use(this.paths.groups, routers.groupsRouter);
        this.app.use(this.paths.inscribe, routers.inscribeRouter);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port ${this.port}`);
        });
    }
}