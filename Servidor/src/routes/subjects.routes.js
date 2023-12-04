import { Router } from 'express';
import { SubjectsController } from '../controllers/subjects.controller.js';
import { subjectExists } from '../middlewares/subject-exists.js';

const router = Router();

const subjectsController = new SubjectsController();

router.get('/get', subjectsController.getSubjects);

router.post('/create', subjectsController.createSubject);

router.put('/update/:id', [
    subjectExists
], subjectsController.updateSubject);

router.delete('/delete/:id', [
    subjectExists
], subjectsController.deleteSubject);

export default router;