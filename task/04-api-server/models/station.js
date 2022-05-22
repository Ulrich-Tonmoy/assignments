import mongoose from "mongoose";

const stationSchema = mongoose.Schema({
    title: String,
    frequency: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const RadioStation = mongoose.model("RadioStation", stationSchema);

export default RadioStation;
