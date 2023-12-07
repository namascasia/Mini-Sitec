import { Router } from 'express';
import { GroupsController } from '../controllers/groups.controller.js';

const router = Router();

const groupsController = new GroupsController();

router.get('/get', groupsController.getGroups);

router.post('/create', groupsController.createGroup);

router.put('/update/:id', groupsController.updateGroup);

router.delete('/delete/:id', groupsController.deleteGroup);

router.put('/inscribe/:id', groupsController.inscribe);

export default router;