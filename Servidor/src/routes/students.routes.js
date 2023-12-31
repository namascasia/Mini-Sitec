import { Router } from 'express';
import { StudentsController } from '../controllers/students.controller.js';
import { studentExists } from '../middlewares/student-exists.js';

const router = Router();

const studentsController = new StudentsController();

router.get('/get', studentsController.getStudents);

router.get('/get/:id', [
    studentExists
], studentsController.getStudent);

router.post('/create', studentsController.createStudent);

router.put('/update/:id', studentsController.updateStudent);

router.delete('/delete/:id', studentsController.deleteStudent);

export default router;