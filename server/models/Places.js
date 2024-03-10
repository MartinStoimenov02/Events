import mongoose from 'mongoose';

const PlacesScheme = new mongoose.Schema({
    address: {
        type: String,
        required:[true, "address is required."],
    },
    imagePath: {
        type: String,
        required:[true, "imagePath is required."],
    },
}, {timestamps:true});

const PlacesModel = mongoose.model("places", PlacesScheme);

export default PlacesModel;