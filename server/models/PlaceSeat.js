import mongoose from 'mongoose';

const PlaceSeatScheme = new mongoose.Schema({
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: "Events",
        required:[true, "eventId is required."]
    },
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
    seatPrice: {
        type: mongoose.Types.Decimal128,
        required:[true, "price is required."]
    },
    isTaken : {
        type: Boolean,
        required:[true, "isTaken is required."],
        default: false
    },
}, {timestamps:true});

const PlaceSeatsModel = mongoose.model("placeSeats", PlaceSeatScheme);

export default PlaceSeatsModel;