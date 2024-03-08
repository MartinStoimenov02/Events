const mongoose = require('mongoose');

const TicketStatusesScheme = new mongoose.Schema({
    statusName: {
        type: String,
        required:[true, "statusName is required"],
        unique: [true, "statusName must be unique"]
    },
}, {timestamps:true});

const TicketStatusesModel = mongoose.model("ticketStatuses", TicketStatusesScheme);

module.exports = TicketStatusesModel;