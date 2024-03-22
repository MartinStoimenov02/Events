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

  export const getPlaceById = async(req, res, next) => {
    try{
      const placeId = req.params.placeId;
      const place = await PlacesModel.findById(placeId);
      if (!place) {
          return res.status(404).json({ message: 'Place not found' });
      }
      res.json(place);
    }catch(err){
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