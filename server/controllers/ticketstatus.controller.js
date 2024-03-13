import TicketStatusesModel from '../models/TicketStatus.js';

export const getTicketStatuses = async(req, res, next) => {
    try {
        const ticketStatuses = await TicketStatusesModel.find({});
        console.log(ticketStatuses);
        res.json(ticketStatuses);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }

  export const createTicketStatus = async(req, res, next) => {
    try {
        const ticketStatus = req.body;
        const newTicketStatus = new TicketStatusesModel(ticketStatus);
        await newTicketStatus.save();
        res.json(ticketStatus); 
        console.log(ticketStatus);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }
