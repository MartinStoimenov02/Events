import TicketsModel from "../models/Ticket.js"; 
import PlaceSeatsModel from "../models/PlaceSeat.js";
import TicketStatusesModel from "../models/TicketStatus.js";
import UserModel from "../models/User.js";

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

  export const getActiveTicketsByEventId = async (req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const placeId = req.params.placeId;
  
      // Query tickets based on eventId, placeId, and unassigned userId
      const tickets = await TicketsModel.find({
        eventId: eventId,
        userId: null, // Check for unassigned userId
        seatId: { $in: await getSeatsForPlace(placeId) } // Retrieve seats for the specified place
      });
  
      // If no tickets found, return 404
      if (!tickets || tickets.length === 0) {
        return res.status(404).json({ message: 'No active tickets found for the specified event and place' });
      }
  
      // Return the retrieved tickets
      res.json(tickets);
    } catch (err) {
      // Handle errors
      console.error('Error fetching active tickets:', err);
      next(err); // Pass error to the error handler middleware
    }
  };
  
  // Helper function to retrieve seats for a specific place
  const getSeatsForPlace = async (placeId) => {
    try {
      // Use your logic to retrieve seatIds based on the provided placeId
      // For example, query your PlaceSeats model to get seatIds for the specified place
      // Replace the following line with your actual implementation
      const seats = await PlaceSeatsModel.find({ placeId: placeId }, '_id');
      return seats.map(seat => seat._id);
    } catch (error) {
      console.error('Error fetching seats for place:', error);
      throw error; // Propagate error
    }
  };
  
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

  export const updateTickets = async (req, res, next) => {
    try {
        const { updatedTickets } = req.body;
        console.log("updatedTickets: " + JSON.stringify(updatedTickets));
        const ticketIds = updatedTickets.map(ticket => ticket._id);
        console.log("ticketIds: " + JSON.stringify(ticketIds));

        const userId = "65ff1c3b47563e0790cbe1d4";
        const statusId = "65ff1b3047563e0790cbe1bb";

        console.log("userId: " + userId);
        console.log("statusId:" + statusId);

        const updatedDocs = [];
        for (const ticketId of ticketIds) {
            const updatedTicket = await TicketsModel.findByIdAndUpdate(ticketId, { userId: userId, ticketStatusId: statusId }, { new: false });
            updatedDocs.push(updatedTicket);
        }

        res.json(updatedDocs); // Return the updated tickets
        console.log(updatedDocs);
    } catch (error) {
        next(error); // 'error' should be used instead of 'err'
        console.log(error);
    }
}
