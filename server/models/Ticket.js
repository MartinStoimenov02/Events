import mongoose from 'mongoose';

const TicketScheme = new mongoose.Schema({
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: "Events ",
        required:[true, "eventId is required."]
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users ",
        default: null
    },
    seatPrice: {
        type: mongoose.Types.Decimal128,
        required:[true, "price is required."]
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

const TicketsModel = mongoose.model("tickets", TicketScheme);

export default TicketsModel;