import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const subjects = mysqlTable('MATERIAS', {
    id: varchar('CLAVEMATERIA', { length: 8 }).primaryKey().notNull(),
    name: varchar('NOMBRE', { length: 150 }).notNull(),
    credits: int('CREDITOS').notNull()
});