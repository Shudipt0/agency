import express from 'express';
import { addProject, deleteProject, getAllProjects, getProject, updateProject } from '../controllers/project.js';

const router = express.Router();

// Sample route to get all projects
router.post('/', addProject);
router.get('/', getAllProjects);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);


export default router;