import { Router } from 'express';
import { InscribeController } from '../controllers/inscribe.controller.js';

const router = Router();

const inscribeController = new InscribeController();

router.post('/create', inscribeController.create);

export default router;