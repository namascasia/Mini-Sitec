import { Router } from 'express';
import { SubjectsController } from '../controllers/subjects.controller.js';

const router = Router();

const subjectsController = new SubjectsController();

router.get('/get', subjectsController.getSubjects);

router.post('/create', subjectsController.createSubject);

router.put('/update/:id', subjectsController.updateSubject);

router.delete('/delete/:id', subjectsController.deleteSubject);

export default router;