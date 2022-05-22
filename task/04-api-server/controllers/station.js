import RadioStation from "../models/station.js";
import { mongoose } from "mongoose";

export const getStations = async (req, res) => {
    try {
        const stations = await RadioStation.find({});

        res.status(200).json(stations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createStation = async (req, res) => {
    const station = req.body;

    const existingStation = await RadioStation.find({
        $or: [{ title: station.title }, { frequency: station.frequency }],
    });
    if (existingStation.length > 0)
        return res.status(404).json({ message: "Station already exist" });

    const newStation = new RadioStation({
        ...station,
        createdAt: new Date().toISOString(),
    });

    try {
        await newStation.save();
        res.status(201).json(newStation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateStation = async (req, res) => {
    const { id: _id } = req.params;
    const station = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Not a valid action");

    const updatedStation = await RadioStation.findByIdAndUpdate(
        _id,
        { ...station, _id },
        { new: true }
    );

    res.json(updatedStation);
};

export const deleteStation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Not a valid action");

    await RadioStation.findByIdAndRemove(id);

    res.json({ message: "Station deleted successfully!!" });
};
