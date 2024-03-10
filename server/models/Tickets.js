import mongoose from 'mongoose';

const TicketsScheme = new mongoose.Schema({
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: "Events ",
        required:[true, "eventId is required."]
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users ",
        required:[true, "userId is required."]
    },
    ticketNumber: {
        type: String,
        required:[true, "ticketNumber is required."],
        unique: [true, "ticketNumber must be unique"]
    },
    seatId: {
        type: mongoose.Types.ObjectId,
        ref: "PlaceSeats",
        required:[true, "seatId is required."]
    },
    ticketStatusId: {
        type: mongoose.Types.ObjectId,
        ref: "TicketStatuses",
        required:[true, "seatId is required."]
    },
}, {timestamps:true});

const TicketsModel = mongoose.model("tickets", TicketsScheme);

export default TicketsModel;