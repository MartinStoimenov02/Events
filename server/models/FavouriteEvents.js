import mongoose from 'mongoose';

const FavouriteEventsScheme = new mongoose.Schema({
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: "Events ",
        required:[true, "eventId is required."]
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref: "Users ",
        required:[true, "userId is required."]
    },
}, {timestamps:true});

const FavouriteEventsModel = mongoose.model("favouriteEvents", FavouriteEventsScheme);

export default FavouriteEventsModel;