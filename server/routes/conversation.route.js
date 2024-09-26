import express from 'express';
import ConversationController from '../controllers/conversation.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

// GET localhost:3000/conversations/:userId  // get all conversations of a target user (by userId)
// GET localhost:3000/conversations/:id      // get specific conversations (by Id)
// POST localhost:3000/conversations/:id    // create a new conversation
// PUT localhost:3000/conversations/:id    // send a message to the target conversation

router.get('/user/:userId', ConversationController.getConversationsByUserId);
router.get('/:id', ConversationController.getConversationById);
router.post('/', ConversationController.createConversation);
router.put('/:id',UserController.allowIfLoggedIn, ConversationController.sendMessage);
router.put('/:id/messages/:messageId/react', ConversationController.reactOnMessage);

// router.get('/', ConversationController.index);
// router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), ConversationController.store);
// router.get('/:id', ConversationController.show);
// // router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateAny', 'profile'), ConversationController.update);
// router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), ConversationController.destroy);

export default router;