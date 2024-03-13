import PlaceSeatsModel from '../models/PlaceSeat.js'; 

export const getPlaceSeats = async(req, res, next) => {
    try {
        const placeSeats = await PlaceSeatsModel.find({});
        console.log(placeSeats);
        res.json(placeSeats);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }
  
export const createPlaceSeat = async(req, res, next) => {
    try {
        const placeSeat = req.body;
        const newPlaceSeat = new PlaceSeatsModel(placeSeat);
        await newPlaceSeat.save();
        res.json(placeSeat); 
        console.log(placeSeat);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }