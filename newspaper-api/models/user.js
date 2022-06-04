import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    typeId: String,
    isActive: Boolean,
});

const User = mongoose.model("User", userSchema);

export default User;
