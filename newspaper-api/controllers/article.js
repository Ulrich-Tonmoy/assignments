import Author from "./../models/author.js";
import Tag from "./../models/tag.js";
import Article from "../models/article.js";
import { mongoose } from "mongoose";

export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({});

        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getArticle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        const article = await Article.findById(id);

        res.status(200).json(article);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createArticle = async (req, res) => {
    const article = req.body;

    const existingArticle = await Article.find({ title: article.title });
    if (existingArticle.length > 0)
        return res.status(404).json({ message: "Article with the same title already exist" });

    const author = await Author.findOne({ authorName: article.author });
    const allTags = await Tag.find({ $in: { tagName: article.tags } });
    let tags = [];
    allTags.forEach((tag) => {
        tags.push(tag._id);
    });

    const newArticle = new Article({
        ...article,
        tagIds: tags,
        authorId: author._id,
        createdAt: new Date().toISOString(),
    });
    try {
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateArticle = async (req, res) => {
    const { id: _id } = req.params;
    const newArticle = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid action");

    const updatedArticle = await Article.findByIdAndUpdate(
        _id,
        { ...newArticle, _id },
        { new: true }
    );

    res.json(updatedArticle);
};

export const deleteArticle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    await Article.findByIdAndRemove(id);

    res.json({ message: "Article deleted successfully!!" });
};
