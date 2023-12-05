import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { schemas } from "./schemas.js";

export const groups = mysqlTable('GRUPOS', {
    id: varchar('CLAVEGRUPO', { length: 4 }).primaryKey().notNull(),
    subjectId: varchar('CLAVEMATERIA', { length: 4 }).references(() => schemas.subjects.id),
    teacherId: int('CLAVEMAESTRO').references(() => schemas.teachers.id),
    studentsLimit: int('LIMITEALUMNOS').notNull(),
    inscribed: int('INSCRITOS').notNull(),
    scheduleMonday: varchar('HORARIOLUNES', { length: 11 }).notNull(),
    scheduleTuesday: varchar('HORARIOMARTES', { length: 11 }).notNull(),
    scheduleWednesday: varchar('HORARIOMIERCOLES', { length: 11 }).notNull(),
    scheduleThursday: varchar('HORARIOJUEVES', { length: 11 }).notNull(),
    scheduleFriday: varchar('HORARIOVIERNES', { length: 11 }).notNull(),
});