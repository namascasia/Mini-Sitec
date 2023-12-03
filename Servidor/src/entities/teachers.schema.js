import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { ACTIVE } from "../utils/constants/constants.js";

export const teachers = mysqlTable('MAESTROS', {
    id: int('CLAVEMAESTRO').primaryKey().notNull(),
    name: varchar('NOMBRE', { length: 150 }).notNull(),
    department: int('DEPARTAMENTO').notNull(),
    status: varchar('ESTATUS', { length: 1 }).notNull().default(ACTIVE)
});