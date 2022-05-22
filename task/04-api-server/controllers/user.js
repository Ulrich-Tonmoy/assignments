import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
    try {
        const stations = await User.find({});

        res.status(200).json(stations);
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
    const { email, password, fullName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "User already exist" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            email,
            password: hashedPassword,
            name: fullName,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
