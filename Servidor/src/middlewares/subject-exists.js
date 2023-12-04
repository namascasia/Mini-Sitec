import { eq } from "drizzle-orm";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";

export const subjectExists = async (req, res, next) => {
    const subjectId = req.params.id;

    const [subject] = await db.select()
        .from(schemas.subjects)
        .where(eq(schemas.subjects.id, subjectId));

    if (subject) return next();

    res.status(HTTP_CODES.BAD_REQUEST).json({
        data: null,
        message: `La materia con la clave ${subjectId} no existe`
    });
}