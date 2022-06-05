import mongoose from "mongoose";

import Author from "../models/author.js";

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find({});

        res.status(200).json(authors);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAuthor = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        const type = await Author.findById(id);

        res.status(200).json(type);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createAuthor = async (req, res) => {
    const { author } = req.body;

    const existingAuthor = await Author.find({ authorName: author });
    if (existingAuthor.length > 0)
        return res.status(404).json({ message: "Author with the same name already exist" });

    try {
        const result = await Author.create({ authorName: author });

        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateAuthor = async (req, res) => {
    const { id: _id } = req.params;
    const { author } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid action");

    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            _id,
            { authorName: author, _id },
            { new: true }
        );

        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        await Author.findByIdAndRemove(id);

        res.json({ message: "Author deleted successfully!!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
