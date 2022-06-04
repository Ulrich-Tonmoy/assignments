import mongoose from "mongoose";

const typeSchema = mongoose.Schema({
    type: String,
});

const Type = mongoose.model("Type", typeSchema);

export default Type;
