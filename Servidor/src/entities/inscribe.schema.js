import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const inscribe = mysqlTable('CARGAS', {
    subjectId: varchar('CLAVEMATERIA', { length: 8 }).notNull(),
    groupId: varchar('CLAVEGRUPO', { length: 4 }).notNull(),
    studentId: int('NCONTROL').notNull()
});