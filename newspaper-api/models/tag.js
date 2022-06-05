import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
    tagName: String,
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
