import mongoose from 'mongoose';

const UserScheme = new mongoose.Schema({
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: "Roles",
        required:[true, "role is required."],
    },
    name: {
        type: String,
        required:[true, "name is required."],
    },
    email: {
        type: String,
        required:[true, "email is required."],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required:[true, "password is required."],
        minlength:[8, "Your password must be 8 characters or longer."],
    },
    phoneNumber: {
        type: String,
        required:[true, "phone number is required."],
        unique: [true, "phone number must be unique"],
    },
}, {timestamps:true});

const UserModel = mongoose.model("users", UserScheme);

export default UserModel;