import mongoose from 'mongoose';

const PlaceSeatScheme = new mongoose.Schema({
    placeId: {
        type: mongoose.Types.ObjectId,
        ref: "Places",
        required:[true, "placeId is required."]
    },
    row: {
        type: Number,
        required:[true, "row is required."]
    },
    col: {
        type: Number,
        required:[true, "col is required."]
    },
}, {timestamps:true});

const PlaceSeatsModel = mongoose.model("placeSeats", PlaceSeatScheme);

export default PlaceSeatsModel;