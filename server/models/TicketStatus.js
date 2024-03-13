import mongoose from 'mongoose';

const TicketStatusScheme = new mongoose.Schema({
    statusName: {
        type: String,
        required:[true, "statusName is required"],
        unique: [true, "statusName must be unique"]
    },
}, {timestamps:true});

const TicketStatusesModel = mongoose.model("ticketStatuses", TicketStatusScheme);

export default TicketStatusesModel;