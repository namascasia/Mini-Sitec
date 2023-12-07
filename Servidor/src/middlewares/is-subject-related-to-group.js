import { request, response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";

export const isSubjectRelatedToOneGroup = async (req = request, res = response, next) => {
    const subjectId = req.params.id;

    const [group] = await db.select()
        .from(schemas.groups)
        .where(eq(schemas.groups.subjectId, subjectId));

    if (!group) return next();

    return res.status(HTTP_CODES.BAD_REQUEST).json({
        data: null,
        message: 'No se puede eliminar la materia debido a que esta ligada a un grupo'
    });
}