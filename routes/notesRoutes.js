import { Router } from 'express';
import {getAllNotesController, getOneNoteController, addNoteController, updateNoteController, deleteNoteController} from '../controllers/notesController.js';
import tokenValidateHandler from '../middlewares/tokenValidatehandler.js';

const router = Router();
router.use(tokenValidateHandler);
router.route('/').get(getAllNotesController).post(addNoteController);
router.route('/:id').get(getOneNoteController).put(updateNoteController).delete(deleteNoteController);

export default router;