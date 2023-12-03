import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { ACTIVE_STUDENT } from "../utils/constants/students.constants.js";

export const students = mysqlTable('ALUMNOS', {
    nControl: int('NCONTROL').primaryKey().notNull(),
    name: varchar('NOMBRE', { length: 150 }).notNull(),
    career: varchar('CARRERA', { length: 150 }).notNull(),
    status: varchar('ESTATUS', { length: 1 }).notNull().default(ACTIVE_STUDENT)
});
