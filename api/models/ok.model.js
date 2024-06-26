import mongoose from "mongoose";
const okSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

},{timestamps: true});
const Ok = mongoose.model("Ok", okSchema);
export default Ok