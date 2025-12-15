import express from 'express';
import { addExpert, deleteExpert, getAllexperts, getExpert, updateExpert } from '../controllers/expert.js';
import { validateExpert } from '../middlewares/expert.validate.js';
import { imageUpload } from '../middlewares/imageUpload.js';


const router = express.Router();

// Sample route to get all Experts
router.post('/', imageUpload, validateExpert, addExpert);
router.get('/', getAllexperts);
router.get('/:id', getExpert);
router.put('/:id', imageUpload, updateExpert);
router.delete('/:id', deleteExpert);


export default router;