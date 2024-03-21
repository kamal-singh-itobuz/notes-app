import { Router } from 'express';
import {getNotesController, addNoteController, updateNoteController, deleteNoteController, latestUpdatedController} from '../controllers/notesController.js';
import tokenValidateHandler from '../middlewares/tokenValidatehandler.js';

const router = Router();
router.use(tokenValidateHandler);
router.get('/latest-three', latestUpdatedController);
router.get('/search', getNotesController);
router.post('/upload', addNoteController);
router.put('/update', updateNoteController);
router.delete('/delete', deleteNoteController);

export default router;