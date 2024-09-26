import express from 'express';
import ArtworkController from '../controllers/artwork.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', ArtworkController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), ArtworkController.store);
router.get('/:id', ArtworkController.show);
router.get('/talent/:talentId', ArtworkController.getArtpieces);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), ArtworkController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), ArtworkController.destroy);

export default router;