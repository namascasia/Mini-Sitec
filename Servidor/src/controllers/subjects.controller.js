import { request, response } from "express";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";

export class SubjectsController {

    async getSubjects(req = request, res = response) {
        try {
            const [subjects] = await db.select()
                .from(schemas.subjects);

            res.json({
                data: subjects,
                message: 'Materias consultadas exitosamente',
                code: HTTP_CODES.OK
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            })
        }
    }

    async createSubject(req = request, res = response) {
        const { id, name, credits } = req.body;

        try {

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            })
        }
    }

    async updateSubject(req = request, res = response) {

    }

    async deleteSubject(req = request, res = response) {

    }
}