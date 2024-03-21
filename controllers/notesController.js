import notesModel from "../models/notesModel.js";

const getNotesController = async (req, res) => {
    try {
        if(req.query.search) {
            const value = req.query.search;
            const searchRegex = new RegExp(value, 'i');
            const data = (await notesModel.find({title: {$regex: searchRegex}, user_id: req.id}));
            return res.status(200).json({ message: `Result for search ${value} `, data: data }); 
        }
        else if(req.query.id) {
            const oneId = req.query.id;
            const oneNote = await notesModel.findOne({_id: oneId, user_id: req.id});
            return res.status(200).send({ message: "Note found successfully", data: oneNote });
        }
        const allNotes = await notesModel.find({user_id: req.id}); //here req.id, we are sending after successful token verification of a current user
        res.status(200).json({ message: "All notes fetched", data: allNotes });
        
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

const addNoteController = async (req, res) => {
    try {
        const obj = req.body;
        const alreadyPresent = await notesModel.findOne({ title: obj.title });
        if (alreadyPresent) {
            res.status(400).json({ message: "Note is already added" });
            return;
        }
        // here req.id is coming after token validation
        const newNote = new notesModel({ ...obj, user_id: req.id });
        await newNote.save();
        res.status(201).json({ message: "Note Created!", data: newNote });
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

const updateNoteController = async (req, res) => {
    try {
        const updateId = req.query.id;
        const note = await notesModel.findById(updateId);
        if(!note) {
            throw new Error("Note does not exist.");
        }
        if(note.user_id.toString() !== req.id) throw new Error("You don't have permission to update this note");
        await notesModel.updateOne({_id: updateId}, {$set: req.body});
        return res.status(200).send({ message: "Note updated successfully" });
    } catch (error) {
        return await res.status(404).send({ message: error, data: null, status : 404 });
    }
}

const deleteNoteController = async (req, res) => {
    try {
        const deleteId = req.query.id;
        const note = await notesModel.findById(deleteId);
        if(!note) {
            throw new Error('Note does not exist.');
        }
        if(note.user_id.toString() !== req.id) throw new Error("You don't have permission to delete this note");
        await notesModel.deleteOne({_id: deleteId});
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

const latestUpdatedController = async (req, res) => {
    try {
        const data = await notesModel.find().sort({updatedAt: -1}).limit(3);
        res.status(200).json({ message: "Last three updated", data: data});
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null});
    }
}

export { getNotesController, addNoteController, updateNoteController, deleteNoteController, latestUpdatedController};