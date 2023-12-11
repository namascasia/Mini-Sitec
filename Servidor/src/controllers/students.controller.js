import { request, response } from "express";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { eq } from "drizzle-orm";
import { STATUS } from "../utils/constants/constants.js";

export class StudentsController {

    async getStudents(req = request, res = response) {
        try {

            const students = await db.select()
                .from(schemas.students)
                .where(eq(schemas.students.status, STATUS.ACTIVE));

            res.json({
                data: students,
                message: 'Estudiantes consultados exitosamente',
            })

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
            })
        }
    }

    async getStudent(req = request, res = response) {

        try {

            const student = req.student;

            res.json({
                data: student,
                message: 'Estudiante consultado exitosamente',
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
            });
        }


    }

    async createStudent(req = request, res = response) {
        const { nControl, name, career, status } = req.body;
        try {

            const [student] = await db.select()
                .from(schemas.students)
                .where(eq(schemas.students.nControl, nControl));

            if (student && student.status === STATUS.DELETED) {
                await db.update(schemas.students).set({ status: STATUS.ACTIVE });
                return res.status(HTTP_CODES.CREATED).json({
                    data: null,
                    message: 'Estudiante creado exitosamente',
                });
            }

            if (student) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El estudiante con el numero de control ${nControl} ya existe`,
                });
            }

            const newStudent = {
                nControl,
                name: name.toUpperCase(),
                career,
                status
            };

            await db.insert(schemas.students).values(newStudent);

            res.status(HTTP_CODES.CREATED).json({
                data: newStudent,
                message: 'Estudiante creado exitosamente',
            });

        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
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
                });
            }


            await db.update(schemas.students)
                .set({ name: name.toUpperCase(), career, status })
                .where(eq(schemas.students.nControl, studentId));

            res.json({
                data: null,
                message: 'Estudiante actualizado correctamente',
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: error,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
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
                });
            }

            await db.update(schemas.students)
                .set({ status: STATUS.DELETED })
                .where(eq(schemas.students.nControl, studentId));

            res.json({
                data: null,
                message: 'Estudiante eliminado correctamente',
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error mientras se realizaba esta operacion.',
            });
        }
    }
}