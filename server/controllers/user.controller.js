import UserModel from '../models/User.js';

export const getUsers = async(req, res, next) => {
    try {
        const users = await UserModel.find({});
        console.log(users);
        res.json(users);
      } catch (err) {
        next(err);
        console.log(err);
      }
}

export const createUser = async(req, res, next) => {
    try {
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.json(user); 
        console.log(user);
      } catch (err) {
        next(err);
        console.log(err);
      }
}