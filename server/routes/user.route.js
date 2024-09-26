import express from 'express';
import UserController from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.allowIfLoggedIn, UserController.logout);
router.get('/:id', UserController.show);
router.get('/', UserController.index);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), UserController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), UserController.destroy);

export default router;
