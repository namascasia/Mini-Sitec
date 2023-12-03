import { request, response } from "express";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { and, eq } from "drizzle-orm";
import { ACTIVE, DELETED } from "../utils/constants/constants.js";

export class StudentsController {


    async getStudents(req = request, res = response) {
        try {

            const students = await db.select()
                .from(schemas.students)
                .where(eq(schemas.students.status, ACTIVE));


            res.json({
                data: students,
                message: 'Estudiantes consultados exitosamente',
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

    async getStudent(req = request, res = response) {
        const studentId = req.params.id;

        try {
            const [student] = await db.select()
                .from(schemas.students)
                .where(and(
                    eq(schemas.students.nControl, studentId),
                    eq(schemas.students.status, ACTIVE)
                ));

            if (!student) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El estudiante con el id ${studentId} no existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }


            res.json({
                data: student,
                message: 'Estudiante consultado exitosamente',
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

    async createStudent(req = request, res = response) {
        const { nControl, name, career, status } = req.body;
        try {

            const [student] = await db.select()
                .from(schemas.students)
                .where(eq(schemas.students.nControl, nControl));

            if (student) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El estudiante con el numero de control ${nControl} ya existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }

            await db.insert(schemas.students).values({
                nControl, name, career, status
            });

            res.status(HTTP_CODES.CREATED).json({
                data: null,
                message: 'Estudiante creado exitosamente',
                code: HTTP_CODES.CREATED
            });

        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
                code: HTTP_CODES.INTERNAL_SERVER_ERROR
            });
        }

    }

    async updateStudent(req = request, res = response) {
        const { name, career, status } = req.body;
        const studentId = req.params.id;

        try {

            const [student] = await db.select()
                .from(schemas.students)
                .where(eq(schemas.students.nControl, studentId));

            if (!student) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El estudiante con el numero de control ${nControl} no existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }


            await db.update(schemas.students)
                .set({ name, career, status })
                .where(eq(schemas.students.nControl, studentId));

            res.json({
                data: null,
                message: 'Estudiante actualizado correctamente',
                code: HTTP_CODES.OK
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: error,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
                code: HTTP_CODES.INTERNAL_SERVER_ERROR
            });
        }
    }

    async deleteStudent(req = request, res = response) {
        const studentId = req.params.id;

        try {

            const [student] = await db.select()
                .from(schemas.students)
                .where(eq(schemas.students.nControl, studentId));

            if (!student) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El estudiante con el numero de control ${nControl} no existe`,
                    code: HTTP_CODES.BAD_REQUEST
                });
            }

            await db.update(schemas.students)
                .set({ status: DELETED })
                .where(eq(schemas.students.nControl, studentId));

            res.json({
                data: null,
                message: 'Estudiante eliminado correctamente',
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