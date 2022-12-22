import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    urlData: { type: String, required: true }
})

export const Url = mongoose.model('url', urlSchema);