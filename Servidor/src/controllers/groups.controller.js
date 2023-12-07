import { request, response } from "express";
import { db } from "../db/connection.js";
import { schemas } from "../entities/schemas.js";
import { eq } from "drizzle-orm";
import { HTTP_CODES } from "../utils/constants/http-status-codes.js";

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
        const {
            subjectId, id, teacherId, studentsLimit,
            schedules } = req.body;
        try {

            const [group] = await db.select()
                .from(schemas.groups)
                .where(eq(schemas.groups.id, id));

            if (group) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El grupo con la clave ${id} ya existe`
                });
            }


            await db.insert(schemas.groups).values({
                id, subjectId, teacherId, studentsLimit,
                scheduleMonday: schedules[0], scheduleTuesday: schedules[1],
                scheduleWednesday: schedules[2], scheduleThursday: schedules[3],
                scheduleFriday: schedules[4], inscribed: 0
            });

            res.status(HTTP_CODES.CREATED).json({
                data: null,
                message: 'Grupo creado exitosamente'
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }
    }

    async updateGroup(req = request, res = response) {
        const { subjectId, id, teacherId, studentsLimit, schedules } = req.body;
        const groupId = req.params.id;
        try {
            const [group] = await db.select()
                .from(schemas.groups)
                .where(eq(schemas.groups.id, groupId));

            if (!group) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: `El grupo con la clave ${id} ya existe`
                });
            }

            console.log(group.inscribed);

            await db.update(schemas.groups)
                .set({
                    subjectId, id, teacherId, studentsLimit, inscribed: group.inscribed,
                    scheduleMonday: schedules[0], scheduleTuesday: schedules[1],
                    scheduleWednesday: schedules[2], scheduleThursday: schedules[3],
                    scheduleFriday: schedules[4]
                })
                .where(eq(schemas.groups.id, groupId));

            res.json({
                data: null,
                message: 'Grupo actualizado exitosamente'
            });
        } catch (error) {
            console.log(error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }

    }

    async inscribe(req = request, res = response) {
        const groupId = req.params.id;
        try {

            const [group] = await db.select()
                .from(schemas.groups)
                .where(eq(schemas.groups.id, groupId));

            if (group.inscribed === group.studentsLimit) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    data: null,
                    message: 'Este grupo ya está lleno'
                });
            }

            await db.update(schemas.groups)
                .set({
                    inscribed: group.inscribed + 1
                })
                .where(eq(schemas.groups.id, groupId));

            res.json({
                data: null,
                message: null
            });
        } catch (error) {
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                data: null,
                message: 'Ha ocurrido un error al realizar esta operacion, contacte al administrador'
            });
        }
    }

    async deleteGroup(req = request, res = response) {
        const groupId = req.params.id;
        try {
            await db.delete(schemas.groups).where(eq(schemas.groups.id, groupId));

            res.json({
                data: null,
                message: "Grupo eliminado exitosamente"
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