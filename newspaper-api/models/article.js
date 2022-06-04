import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
    title: String,
	author: String,
    image: String,
    Description: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
