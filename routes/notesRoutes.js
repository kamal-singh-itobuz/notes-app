import { Router } from 'express';
import {getAllNotesController, getOneNoteController, addNoteController, updateNoteController, deleteNoteController, latestUpdatedController} from '../controllers/notesController.js';
import tokenValidateHandler from '../middlewares/tokenValidatehandler.js';

const router = Router();
router.use(tokenValidateHandler);
router.get('/updated', latestUpdatedController);
router.get('/:title', getOneNoteController);
router.get('/', getAllNotesController);
router.post('/', addNoteController);
router.put('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);

export default router;