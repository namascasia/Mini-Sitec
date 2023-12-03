import { Router } from 'express';
import { TeachersController } from '../controllers/teachers.controller.js';

const router = Router();

const teachersController = new TeachersController();

router.get('/get', teachersController.getTeachers);

router.get('/get/:id', teachersController.getTeacher);

router.post('/create', teachersController.createTeacher);

router.put('/update/:id', teachersController.updateTeacher);

router.delete('/delete/:id', teachersController.deleteTeacher);

export default router;