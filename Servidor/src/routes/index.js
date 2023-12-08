import StudentsRouter from './students.routes.js';
import TeachersRouter from './teachers.routes.js';
import SubjectsRouter from './subjects.routes.js';
import GroupsRouter from './groups.routes.js';
import InscribeRouter from './inscribe.routes.js';

export const routers = {
    studentsRouter: StudentsRouter,
    teachersRouter: TeachersRouter,
    subjectsRouter: SubjectsRouter,
    groupsRouter: GroupsRouter,
    inscribeRouter: InscribeRouter
};