import { and, eq } from "drizzle-orm";
import { db } from "../db/connection.js"
import { schemas } from "../entities/schemas.js"
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";
import { STATUS } from "../utils/constants/constants.js";

export const studentExists = async (req, res, next) => {
    const studentId = req.params.id;

    const [student] = await db.select()
        .from(schemas.students)
        .where(and(
            eq(schemas.students.nControl, studentId),
            eq(schemas.students.status, STATUS.ACTIVE)
        ));

    if (student) {
        req.student = student;
        return next();
    };

    return res.status(HTTP_CODES.BAD_REQUEST).json({
        data: null,
        message: `El alumno con el id ${studentId} no existe`,
        code: HTTP_CODES.BAD_REQUEST
    });
}