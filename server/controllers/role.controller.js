import RoleModel from '../models/Role.js';

export const getRoles = async(req, res, next) => {
    try {
        const roles = await RoleModel.find({});
        console.log(roles);
        res.json(roles);
      } catch (err) {
        next(err);
        console.log(err);
      }
}

export const createRole = async(req, res, next) => {
    try {
        const role = req.body;
        const newRole = new RoleModel(role);
        await newRole.save();
        res.json(role); //send to frontend the created role
        console.log(role);
      } catch (err) {
        next(err);
        console.log(err);
      }
}