import notesModel from "../models/notesModel.js";

const getAllNotesController = async (req, res) => {
    try {
        const allNotes = await notesModel.find();
        res.status(200).json({ message: "All notes fetched", data: allNotes });
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

const getOneNoteController = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await notesModel.findById(noteId);
        res.status(200).json({ message: "Note is found", data: note });
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
        const updateId = req.params.id;
        await notesModel.findByIdAndUpdate(updateId, req.body);
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

const deleteNoteController = async (req, res) => {
    try {
        const deleteId = req.params.id;
        await notesModel.findByIdAndUpdate(deleteId);
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

export { getAllNotesController, getOneNoteController, addNoteController, updateNoteController, deleteNoteController };