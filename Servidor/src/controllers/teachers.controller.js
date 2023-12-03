import { request, response } from "express";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { and, eq } from "drizzle-orm";
import { ACTIVE, DELETED } from "../utils/constants/constants.js";

export class TeachersController {
    async getTeachers(req = request, res = response) {
        try {

            const teachers = await db.select()
                .from(schemas.teachers)
                .where(eq(schemas.teachers.status, ACTIVE));


            res.json({
                data: teachers,
                message: 'Maestros consultados exitosamente',
                code: HTTP_CODES.OK
            })

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
                code: HTTP_CODES.INTERNAL_SERVER_ERROR
            })
        }
    }

    async getTeacher(req = request, res = response) {
        const teacherId = req.params.id;

        try {
            const [teacher] = await db.select()
                .from(schemas.teachers)
                .where(and(
                    eq(schemas.teachers.id, teacherId),
                    eq(schemas.teachers.status, ACTIVE_teacher)
                ));

            if (!teacher) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El Maestro con el id ${teacherId} no existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }


            res.json({
                data: teacher,
                message: 'Maestro consultado exitosamente',
                code: HTTP_CODES.OK
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
                code: HTTP_CODES.INTERNAL_SERVER_ERROR
            });
        }


    }

    async createTeacher(req = request, res = response) {
        const { id, name, department, status } = req.body;
        try {

            const [teacher] = await db.select()
                .from(schemas.teachers)
                .where(eq(schemas.teachers.id, id));

            if (teacher) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El Maestro con el id ${id} ya existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }

            await db.insert(schemas.teachers).values({
                id, name, department, status
            });

            res.status(HTTP_CODES.CREATED).json({
                data: null,
                message: 'Maestro creado exitosamente',
                code: HTTP_CODES.CREATED
            });

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
                code: HTTP_CODES.INTERNAL_SERVER_ERROR
            });
        }

    }

    async updateTeacher(req = request, res = response) {
        const { name, career, status } = req.body;
        const teacherId = req.params.id;

        try {

            const [teacher] = await db.select()
                .from(schemas.teachers)
                .where(eq(schemas.teachers.id, teacherId));

            if (!teacher) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El Maestro con el id ${id} no existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }


            await db.update(schemas.teachers)
                .set({ name, career, status })
                .where(eq(schemas.teachers.id, teacherId));

            res.json({
                data: null,
                message: 'Maestro actualizado correctamente',
                code: HTTP_CODES.OK
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
                code: HTTP_CODES.INTERNAL_SERVER_ERROR
            });
        }
    }

    async deleteTeacher(req = request, res = response) {
        const teacherId = req.params.id;

        try {

            const [teacher] = await db.select()
                .from(schemas.teachers)
                .where(eq(schemas.teachers.id, teacherId));

            if (!teacher) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El Maestro con el id ${id} no existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }

            await db.update(schemas.teachers)
                .set({ status: DELETED })
                .where(eq(schemas.teachers.id, teacherId));

            res.json({
                data: null,
                message: 'Maestro eliminado correctamente',
                code: HTTP_CODES.OK
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
                code: HTTP_CODES.INTERNAL_SERVER_ERROR
            });
        }
    }
}