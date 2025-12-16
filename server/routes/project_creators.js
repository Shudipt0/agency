import express from 'express';
import { addProject_Creators, deleteProject_Creators, getAllProject_Creators, getProject_Creators } from '../controllers/project_creator.js';



const router = express.Router();

// Sample route to get all projects
router.post('/', addProject_Creators);
router.get('/', getAllProject_Creators);
router.get('/:id', getProject_Creators);
router.delete('/:id', deleteProject_Creators);


export default router;