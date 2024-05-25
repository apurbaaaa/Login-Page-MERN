import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userType: String,
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
