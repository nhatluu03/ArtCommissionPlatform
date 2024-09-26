import express from 'express';
import OrderController from '../controllers/order.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', OrderController.index);
// router.post('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), OrderController.store);
router.post('/create-payment-intent/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), OrderController.intent);
router.get('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('readOwn', 'profile'), OrderController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), OrderController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), OrderController.destroy);

export default router;