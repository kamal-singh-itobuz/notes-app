import notesModel from "../models/notesModel.js";

const getNotesController = async (req, res) => {
    try {
        if(req.query.search) {
            const value = req.query.search;
            const searchRegex = new RegExp(value, 'i');
            const data = (await notesModel.find({title: {$regex: searchRegex}, user_id: req.id}));
            return res.status(200).send({ message: `Result for search ${value} `, data: data }); 
        }
        else if(req.query.id) {
            const oneId = req.query.id;
            const oneNote = await notesModel.findOne({_id: oneId, user_id: req.id});
            return res.status(200).send({ message: "Note found successfully", data: oneNote });
        }
        else if(req.query.hidden) {
            const hiddenNotes = await notesModel.find({user_id: req.id, isHide: true});
            return res.status(200).send({message: "All Hidden Notes", data: hiddenNotes});
        }
        else if(req.query.visible) {
            const visibleNotes = await notesModel.find({user_id: req.id, isHide: false}); //here req.id, we are sending after successful token verification of a current user
            return res.status(200).send({message: "All Non-Hidden Notes", data: visibleNotes});
        }        
    } catch (error) {
        res.status(404).json({ message: "Route not found", data: null, error });
    }
}

const addNoteController = async (req, res) => {
    try {
        const obj = req.body;
        console.log(obj);
        const alreadyPresent = await notesModel.findOne({ title: obj.title });
        if (alreadyPresent) {
            return res.status(400).json({ message: "Note is already added" });
        }
        // here req.id is coming after token validation
        const newNote = new notesModel({ ...obj, user_id: req.id });
        await newNote.save();
        return res.status(201).send({ message: "Note Created!", data: newNote });
    } catch (error) {
        return res.status(404).send({ message: "Route not found", data: null, error });
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
        if(Array.isArray(deleteId)) {
            await notesModel.deleteMany({user_id: req.id, _id: {$in: deleteId}});
            return res.status(200).send({ message: "Multiple Notes Deleted successfully" });
        }
        else {
            await notesModel.deleteOne({user_id: req.id, _id: deleteId});
            return res.status(200).send({ message: "Single Note Deleted successfully" });
        }
        
    } catch (error) {
        return res.status(404).send({ message: "Route not found", data: null, error });
    }
}

const latestUpdatedController = async (req, res) => {
    try {
        const data = await notesModel.find().sort({updatedAt: -1}).limit(3);
        return res.status(200).send({ message: "Last three updated", data: data});
    } catch (error) {
        return res.status(404).send({ message: "Route not found", data: null});
    }
}

const hideNotesController = async (req, res) => {
    try {
        const hideIds = req.query.hide_id;
        if(Array.isArray(hideIds)){
            await notesModel.updateMany({user_id: req.id, _id: {$in : hideIds}}, {$set: {isHide: true}});
            return res.status(200).send({message: "Multiple Soft Delete or Hide successfull"});
        }
        else {
            await notesModel.updateOne({user_id: req.id, _id: hideIds}, {$set: {isHide: true}});
            return res.status(200).send({message: "Single Soft Delete or Hide successfull"});
        }
    } catch (error) {
        return res.status(404).json({message: error});
    }
}

export { getNotesController, addNoteController, updateNoteController, deleteNoteController, latestUpdatedController, hideNotesController};