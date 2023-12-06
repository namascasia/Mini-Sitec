import { request, response } from "express";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { and, eq } from "drizzle-orm";
import { ACTIVE, DELETED, STATUS } from "../utils/constants/constants.js";

export class TeachersController {
    async getTeachers(req = request, res = response) {
        try {

            const teachers = await db.select()
                .from(schemas.teachers);

            res.json({
                data: teachers,
                message: 'Maestros consultados exitosamente',
            });

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
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
                });
            }


            res.json({
                data: teacher,
                message: 'Maestro consultado exitosamente',
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
            });
        }


    }

    async createTeacher(req = request, res = response) {
        const { id, name, department, status } = req.body;
        try {

            const [teacher] = await db.select()
                .from(schemas.teachers)
                .where(eq(schemas.teachers.id, id));


            if (teacher && teacher.status === STATUS.DELETED) {
                await db.update(schemas.teachers).set({ status: STATUS.ACTIVE });
                return res.status(HTTP_CODES.CREATED).json({
                    data: null,
                    message: 'Maestro creado exitosamente',
                });
            }

            if (teacher) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El Maestro con el id ${id} ya existe`,
                });
            }

            const newTeacher = {
                id,
                name: name.toUpperCase(),
                department,
                status
            };

            await db.insert(schemas.teachers).values(newTeacher);

            res.status(HTTP_CODES.CREATED).json({
                data: newTeacher,
                message: 'Maestro creado exitosamente',
            });

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
            });
        }

    }

    async updateTeacher(req = request, res = response) {
        const { name, department } = req.body;
        const teacherId = req.params.id;

        try {

            const [teacher] = await db.select()
                .from(schemas.teachers)
                .where(eq(schemas.teachers.id, teacherId));

            if (!teacher) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El Maestro con el id ${id} no existe`,
                });
            }


            await db.update(schemas.teachers)
                .set({ name: name.toUpperCase(), department })
                .where(eq(schemas.teachers.id, teacherId));

            res.json({
                data: null,
                message: 'Maestro actualizado correctamente',
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
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
                });
            }

            await db.update(schemas.teachers)
                .set({ status: DELETED })
                .where(eq(schemas.teachers.id, teacherId));

            res.json({
                data: null,
                message: 'Maestro eliminado correctamente',
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
            });
        }
    }
}