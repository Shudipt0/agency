import express from 'express';
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { validateUser } from '../middlewares/user.validate.js';



const router = express.Router();

// Sample route to get all Users
router.post('/', imageUpload, validateUser, addUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', imageUpload, updateUser);
router.delete('/:id', deleteUser);


export default router;