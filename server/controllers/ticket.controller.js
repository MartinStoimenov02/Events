import TicketsModel from "../models/Ticket.js"; 

export const getTickets = async(req, res, next) => {
    try {
        const tickets = await TicketsModel.find({});
        console.log(tickets);
        res.json(tickets);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }
  
export const createTicket = async(req, res, next) => {
    try {
        const ticket = req.body;
        const newTicket = new TicketsModel(ticket);
        newTicket.ticketNumber = ticket.eventId+new Date().toISOString()+ticket.seatId
        await newTicket.save();
        res.json(ticket); 
        console.log(ticket);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }