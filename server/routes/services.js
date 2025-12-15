import express from 'express';
import { addService, deleteService, getAllServices, getService, updateService } from '../controllers/service.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { validateService } from '../middlewares/Service.validate.js';



const router = express.Router();

// Sample route to get all Services
router.post('/', imageUpload, validateService, addService);
router.get('/', getAllServices);
router.get('/:id', getService);
router.put('/:id', imageUpload, updateService);
router.delete('/:id', deleteService);


export default router;