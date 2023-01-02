import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter name."]
    },
    email: {
        type: String,
        required: [true, "Please enter email."],
        unique: [true, "Email already exist."]
    },
    password: {
        type: String,
        required: [true, "Please enter password."],
        minlength: true
    },
    roles: {
        User: {
            type: Number,
            default: 1001
        },
        Editor: Number,
        Admin: Number
    }
});

const User = mongoose.model("User", userSchema);

export default User;
