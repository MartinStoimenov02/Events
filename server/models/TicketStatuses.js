import mongoose from 'mongoose';

const TicketStatusesScheme = new mongoose.Schema({
    statusName: {
        type: String,
        required:[true, "statusName is required"],
        unique: [true, "statusName must be unique"]
    },
}, {timestamps:true});

const TicketStatusesModel = mongoose.model("ticketStatuses", TicketStatusesScheme);

export default TicketStatusesModel;