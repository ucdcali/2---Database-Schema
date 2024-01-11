import express from 'express';
import * as controller from '../controllers/mainController.js';

const router = express.Router();

// Define routes
router.get('/', controller.getIndex);
router.get('/about', controller.getAbout);

router.get('/crud', controller.loadCRUD);
router.post('/create-user', controller.createUser);
router.get('/edit-user/:id', controller.editUser);
router.post('/update-user/:id', controller.updateUser);
router.get('/delete-user/:id', controller.deleteUser);

router.get('/:name', controller.getIndex);

export default router;
