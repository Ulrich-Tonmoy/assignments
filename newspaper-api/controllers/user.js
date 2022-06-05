import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
import mongoose from "mongoose";

import User from "../models/user.js";
import Type from "./../models/type.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User does not exist" });

        const isPasswordConfirmed = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordConfirmed) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d",
            }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const singup = async (req, res) => {
    const user = req.body;

    try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) return res.status(404).json({ message: "User already exist" });

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const type = await Type.findOne({ typeName: user.type });
        if (!type) return res.status(400).json({ message: "Invalid User Type" });

        const result = await User.create({
            ...user,
            typeId: type._id,
            password: hashedPassword,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid action");

    try {
        const type = await Type.findOne({ typeName: user.type });
        if (!type) return res.status(400).json({ message: "Invalid User Type" });

        const updatedUser = await User.findByIdAndUpdate(
            _id,
            { ...user, typeId: type._id, _id },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    try {
        await User.findByIdAndRemove(id);

        res.json({ message: "User deleted successfully!!" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
