import mongoose from 'mongoose'; 

const EventTypeScheme = new mongoose.Schema({
    eventType: {
        type: String,
        required:[true, "eventType is required"],
        unique: [true, "eventType must be unique"]
    },
}, {timestamps:true});

const EventTypeModel = mongoose.model("eventTypes", EventTypeScheme);

export default EventTypeModel;