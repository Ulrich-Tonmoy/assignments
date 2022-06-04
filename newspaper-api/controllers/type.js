import mongoose from "mongoose";

import Type from "../models/type.js";

export const getAllTypes = async (req, res) => {
    try {
        const types = await Type.find({});

        res.status(200).json(types);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getType = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        const type = await Type.findById(id);

        res.status(200).json(type);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createType = async (req, res) => {
    const { type } = req.body;

    const existingType = await Type.find({ type });
    if (existingType.length > 0)
        return res.status(404).json({ message: "Type with the same name already exist" });

    try {
        const result = await Type.create({ type });

        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateType = async (req, res) => {
    const { id: _id } = req.params;
    const { type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid action");

    try {
        const updatedType = await Type.findByIdAndUpdate(_id, { type, _id }, { new: true });

        res.status(200).json(updatedType);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteType = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        await Type.findByIdAndRemove(id);

        res.json({ message: "Type deleted successfully!!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
