import { request, response } from "express";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";

export class GroupsController {

    async getGroups(req = request, res = response) {
        try {
            const groups = await db.select()
                .from(schemas.groups)

            res.json({
                data: groups,
                message: 'Grupos consultados exitosamente'
            })
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }
    }

    async createGroup(req = request, res = response) {

    }

    async updateGroup(req = request, res = response) {

    }

    async deleteGroup(req = request, res = response) {

    }

}