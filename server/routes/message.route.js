// import express from 'express';
// import MessageController from '../controllers/message.controller.js';
// import UserController from '../controllers/user.controller.js';

// const router = express.Router();

// // router.get('/', MessageController.index);
// // router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), MessageController.store);
// router.post('/', MessageController.store);
// router.get('/:id', MessageController.show);
// router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), MessageController.update);
// router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), MessageController.destroy);

// export default router;