import mongoose from 'mongoose';

const EventScheme = new mongoose.Schema({
    approvedByAdminId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        default: null
    },
    isArchived: {
        type: Boolean,
        required:[true, "isArchived is required."],
        default: true
    },
    imagePath: {
        type: String,
        required:[true, "imagePath is required."],
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required:[true, "ownerId is required."]
    },
    countOfTickets: {
        type: Number,
        required:[true, "countOfTickets is required."]
    },
    placeId: {
        type: mongoose.Types.ObjectId,
        ref: "Places",
        required:[true, "placeId is required."]
    },
    description: {
        type: String,
    },
    participants: {
        type: String,
    },
    title: {
        type: String,
        required:[true, "title is required."],
    },
    TypeOfEventId: {
        type: mongoose.Types.ObjectId,
        ref: "eventTypes ",
        required:[true, "TypeOfEventId is required."]
    },
    dateAndTime: {
        type: Date,
        required:[true, "dateAndTime is required."]
    }
}, {timestamps:true});

const EventModel = mongoose.model("events", EventScheme);

export default EventModel;