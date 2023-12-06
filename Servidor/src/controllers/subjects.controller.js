import { request, response } from "express";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { eq } from "drizzle-orm";

export class SubjectsController {

    async getSubjects(req = request, res = response) {
        try {
            const subjects = await db.select()
                .from(schemas.subjects);

            res.json({
                data: subjects,
                message: 'Materias consultadas exitosamente',
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }
    }

    async createSubject(req = request, res = response) {
        const { id, name, credits } = req.body;

        try {
            const [subject] = await db.select()
                .from(schemas.subjects)
                .where(eq(schemas.subjects.id, id));

            if (subject) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `La materia con la clave ${id} ya existe`,
                });
            }

            if (credits > 20) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: 'No es posible agregar una materia de mas de 20 creditos'
                });
            }

            const newSubject = {
                id,
                name: name.toUpperCase(),
                credits
            };

            await db.insert(schemas.subjects).values(newSubject)

            res.status(HTTP_CODES.CREATED).json({
                data: newSubject,
                message: 'Materia creada exitosamente'
            });

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }
    }

    async updateSubject(req = request, res = response) {
        const { name, credits } = req.body;
        const subjectId = req.params.id;
        try {

            await db.update(schemas.subjects)
                .set({ name, credits })
                .where(eq(schemas.subjects.id, subjectId));

            res.json({
                data: null,
                message: 'Materia actualizada correctamente'
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }
    }

    async deleteSubject(req = request, res = response) {
        const subjectId = req.params.id;

        try {
            await db.delete(schemas.subjects).where(eq(schemas.subjects.id, subjectId));

            res.json({
                data: null,
                message: 'Materia borrada exitosamente'
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }
    }
}