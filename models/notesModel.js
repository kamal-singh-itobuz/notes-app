import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const notesModel = mongoose.model("notes", notesSchema);
export default notesModel;

/* 
user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
}
 */
