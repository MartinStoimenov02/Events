import EventModel from '../models/Event.js';

export const getEvents = async(req, res, next) => {
    try {
        const events = await EventModel.find({});
        console.log(events);
        res.json(events);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }
  
  export const getEventById = async(req, res, next) => {
    try {
      const eventId = req.params.eventId;
      const event = await EventModel.findById(eventId);
      console.log(event);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (err) {
        next(err);
        console.log(err);
    }
  }
  
  export const getActiveEvents = async (req, res, next) => {
    try {
        const events = await EventModel.find({
            approvedByAdminId: { $ne: null },
            isArchived: false
        }).exec();
        res.json(events);
    } catch (err) {
        next(err);
        console.log(err);
    }
  }
  
 export const createEvent = async(req, res) => {
    try {
        const event = req.body;
        const newEvent = new EventModel(event);
        await newEvent.save();
        res.json(event); 
        console.log(event);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }