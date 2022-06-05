import mongoose from "mongoose";

const typeSchema = mongoose.Schema({
    typeName: String,
});

const Type = mongoose.model("Type", typeSchema);

export default Type;
