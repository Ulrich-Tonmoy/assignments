import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
    title: String,
    authorId: String,
    image: String,
    description: String,
    tagIds: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
