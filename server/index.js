const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const RoleModel = require('./models/Roles');
const EventModel = require('./models/Events');
const EventTypeModel = require('./models/EventTypes');
const PlacesModel = require('./models/Places');
const FavouriteEventsModel = require('./models/FavouriteEvents');
const TicketsModel = require('./models/Tickets');
const PlaceSeatsModel = require('./models/PlaceSeats');
const TicketStatusesModel = require('./models/TicketStatuses');
const cors = require('cors');

//without this every post request will give an error
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ptsproject68:flhfYzemHSCECoyx@events.1d43mbr.mongodb.net/?retryWrites=true&w=majority&appName=events");

//request - information from frontend to backend, response - information from backend to frontend
app.get("/getRoles", async(req, res) => {
    try {
        const roles = await RoleModel.find({});
        console.log(roles);
        res.json(roles);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
});

app.post("/createRole", async(req, res) => {
    try {
        const role = req.body;
        const newRole = new RoleModel(role);
        await newRole.save();
        res.json(role); //send to frontend the created role
        console.log(role);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
});

app.get("/getUsers", async(req, res) => {
    try {
        const users = await UserModel.find({});
        console.log(users);
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
});

app.post("/createUser", async(req, res) => {
    try {
        const user = req.body;
        const newUser = new UserModel(user);
        await newUser.save();
        res.json(user); 
        console.log(user);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
});

app.get("/getEvents", async(req, res) => {
  try {
      const events = await EventModel.find({});
      console.log(events);
      res.json(events);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.post("/createEvent", async(req, res) => {
  try {
      const event = req.body;
      const newEvent = new EventModel(event);
      await newEvent.save();
      res.json(event); 
      console.log(event);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.get("/getEventTypes", async(req, res) => {
  try {
      const eventTypes = await EventTypeModel.find({});
      console.log(eventTypes);
      res.json(eventTypes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.post("/createEventType", async(req, res) => {
  try {
      const eventType = req.body;
      const newEventType = new EventTypeModel(eventType);
      await newEventType.save();
      res.json(eventType); 
      console.log(eventType);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.get("/getPlaces", async(req, res) => {
  try {
      const places = await PlacesModel.find({});
      console.log(places);
      res.json(places);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.post("/createPlace", async(req, res) => {
  try {
      const place = req.body;
      const newPlace = new PlacesModel(place);
      await newPlace.save();
      res.json(place); 
      console.log(place);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.get("/getPlaceSeats", async(req, res) => {
  try {
      const placeSeats = await PlaceSeatsModel.find({});
      console.log(placeSeats);
      res.json(placeSeats);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.post("/createPlaceSeat", async(req, res) => {
  try {
      const placeSeat = req.body;
      const newPlaceSeat = new PlaceSeatsModel(placeSeat);
      await newPlaceSeat.save();
      res.json(placeSeat); 
      console.log(placeSeat);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.get("/getFavouriteEvents", async(req, res) => {
  try {
      const favouriteEvents = await FavouriteEventsModel.find({});
      console.log(favouriteEvents);
      res.json(favouriteEvents);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.post("/createFavouriteEvent", async(req, res) => {
  try {
      const favouriteEvents = req.body;
      const newFavouriteEvents = new FavouriteEventsModel(favouriteEvents);
      await newFavouriteEvents.save();
      res.json(favouriteEvents); 
      console.log(favouriteEvents);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.get("/getTickets", async(req, res) => {
  try {
      const tickets = await TicketsModel.find({});
      console.log(tickets);
      res.json(tickets);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.post("/createTicket", async(req, res) => {
  try {
      const ticket = req.body;
      const newTicket = new TicketsModel(ticket);
      newTicket.ticketNumber = ticket.eventId+new Date().toISOString()+ticket.userId+ticket.seatId
      await newTicket.save();
      res.json(ticket); 
      console.log(ticket);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.get("/getTicketStatuses", async(req, res) => {
  try {
      const ticketStatuses = await TicketStatusesModel.find({});
      console.log(ticketStatuses);
      res.json(ticketStatuses);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

app.post("/createTicketStatus", async(req, res) => {
  try {
      const ticketStatus = req.body;
      const newTicketStatus = new TicketStatusesModel(ticketStatus);
      await newTicketStatus.save();
      res.json(ticketStatus); 
      console.log(ticketStatus);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
});

//(listening port, function to be started when server starts running)
app.listen(3001, () => {
    console.log("server runs perfectly!");
});