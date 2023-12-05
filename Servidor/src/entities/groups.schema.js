import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { schemas } from "./schemas.js";

export const groups = mysqlTable('GRUPOS', {
    id: varchar('CLAVEGRUPO', { length: 4 }).primaryKey().notNull(),
    subjectId: varchar('CLAVEMATERIA', { length: 4 }).references(() => schemas.subjects.id),
    teacherId: int('CLAVEMAESTRO').references(() => schemas.teachers.id),
    studentsLimit: int('LIMITEALUMNOS').notNull(),
    inscribed: int('INSCRITOS').notNull().default(0),
    scheduleMonday: varchar('HORARIOLUNES', { length: 11 }),
    scheduleTuesday: varchar('HORARIOMARTES', { length: 11 }),
    scheduleWednesday: varchar('HORARIOMIERCOLES', { length: 11 }),
    scheduleThursday: varchar('HORARIOJUEVES', { length: 11 }),
    scheduleFriday: varchar('HORARIOVIERNES', { length: 11 }),
});