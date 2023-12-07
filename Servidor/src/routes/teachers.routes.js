import { Router } from 'express';
import { TeachersController } from '../controllers/teachers.controller.js';
import { isTeacherRelatedToOneGroup } from '../middlewares/is-teacher-related-to-group.js';

const router = Router();

const teachersController = new TeachersController();

router.get('/get', teachersController.getTeachers);

router.get('/get/:id', teachersController.getTeacher);

router.post('/create', teachersController.createTeacher);

router.put('/update/:id', teachersController.updateTeacher);

router.delete('/delete/:id', [
    isTeacherRelatedToOneGroup
], teachersController.deleteTeacher);

export default router;