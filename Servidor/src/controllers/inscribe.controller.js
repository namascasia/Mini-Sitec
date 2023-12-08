import { request, response } from "express";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";

export class InscribeController {

    async create(req = request, res = response) {
        const { loads } = req.body;
        try {

            console.log(loads);
            await db.insert(schemas.inscribe)
                .values(loads);

            res.status(HTTP_CODES.CREATED).json({
                data: null,
                message: 'Carga realizada exitosamente'
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