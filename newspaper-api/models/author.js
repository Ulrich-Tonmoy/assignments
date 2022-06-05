import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    authorName: String,
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
