import mongoose from "mongoose";

import Tag from "../models/tag.js";

export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({});

        res.status(200).json(tags);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getTag = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        const tag = await Tag.findById(id);

        res.status(200).json(tag);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createTag = async (req, res) => {
    const { tag } = req.body;

    const existingTag = await Tag.find({ tagName: tag });
    if (existingTag.length > 0)
        return res.status(404).json({ message: "Tag with the same name already exist" });

    try {
        const result = await Tag.create({ tagName: tag });

        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateTag = async (req, res) => {
    const { id: _id } = req.params;
    const { tag } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid action");

    try {
        const updatedTag = await Tag.findByIdAndUpdate(_id, { tagName: tag, _id }, { new: true });

        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteTag = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        await Tag.findByIdAndRemove(id);

        res.json({ message: "Tag deleted successfully!!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
