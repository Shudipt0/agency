import express from 'express';
import { addContact, deleteContact, getAllContacts, getContact, updateContact } from '../controllers/contact.js';
import { validateContact } from '../middlewares/contact.validate.js';



const router = express.Router();

// Sample route to get all Contacts
router.post('/', validateContact, addContact);
router.get('/', getAllContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);


export default router;