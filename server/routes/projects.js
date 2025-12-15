import express from 'express';
import { addProject, deleteProject, getAllProjects, getProject, updateProject } from '../controllers/project.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import { validateProject } from '../middlewares/project.validate.js';


const router = express.Router();

// Sample route to get all projects
router.post('/', imageUpload, validateProject, addProject);
router.get('/', getAllProjects);
router.get('/:id', getProject);
router.put('/:id', imageUpload, updateProject);
router.delete('/:id', deleteProject);


export default router;