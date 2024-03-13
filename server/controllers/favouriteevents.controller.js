import FavouriteEventsModel from '../models/FavouriteEvent.js';

export const getFavouriteEvents = async(req, res, next) => {
    try {
        const favouriteEvents = await FavouriteEventsModel.find({});
        console.log(favouriteEvents);
        res.json(favouriteEvents);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }
  
  export const createFavouriteEvent = async(req, res, next) => {
    try {
        const favouriteEvents = req.body;
        const newFavouriteEvents = new FavouriteEventsModel(favouriteEvents);
        await newFavouriteEvents.save();
        res.json(favouriteEvents); 
        console.log(favouriteEvents);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }