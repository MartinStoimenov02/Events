import mongoose from 'mongoose';

const RoleScheme = new mongoose.Schema({
    roleName: {
        type: String,
        required:[true, "roleName is required"],
        unique: [true, "roleName must be unique"]
    },
}, {timestamps:true});

const RoleModel = mongoose.model("roles", RoleScheme);

export default RoleModel;