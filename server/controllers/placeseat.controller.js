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

  // Get active place seats by event and place
export const getPlaceSeatsByIds = async (req, res, next) => {
  try {
    const { placeSeatIds } = req.body;
    console.log(placeSeatIds);
    // Fetch place seats using the provided place seat IDs
    const linkedPlaceSeats = await PlaceSeatsModel.find({ _id: { $in: placeSeatIds } });
    console.log(linkedPlaceSeats);
    res.json(linkedPlaceSeats);
  } catch (error) {
    next(err);
    console.log(err);
  }
}