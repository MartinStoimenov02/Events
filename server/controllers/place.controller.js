import PlacesModel from '../models/Place.js';

export const getPlaces = async(req, res, next) => {
    try {
        const places = await PlacesModel.find({});
        console.log(places);
        res.json(places);
      } catch (err) {
        next(err);
        console.log(err);
      }
  } 
  
  export const createPlace = async(req, res, next) => {
    try {
        const place = req.body;
        const newPlace = new PlacesModel(place);
        await newPlace.save();
        res.json(place); 
        console.log(place);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }