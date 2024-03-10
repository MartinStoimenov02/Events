import mongoose from 'mongoose';

const RolesScheme = new mongoose.Schema({
    roleName: {
        type: String,
        required:[true, "roleName is required"],
        unique: [true, "roleName must be unique"]
    },
}, {timestamps:true});

const RoleModel = mongoose.model("roles", RolesScheme);

export default RoleModel;