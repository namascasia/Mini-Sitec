import express from 'express';

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

    }

    middlewares() {

    }

    initDb() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port ${this.port}`);
        });
    }
}