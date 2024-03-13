import mongoose from 'mongoose';

const PlaceScheme = new mongoose.Schema({
    address: {
        type: String,
        required:[true, "address is required."],
    },
    imagePath: {
        type: String,
        required:[true, "imagePath is required."],
    },
}, {timestamps:true});

const PlacesModel = mongoose.model("places", PlaceScheme);

export default PlacesModel;