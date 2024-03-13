import EventTypeModel from '../models/EventType.js';

export const getEventTypes = async(req, res, next) => {
    try {
        const eventTypes = await EventTypeModel.find({});
        console.log(eventTypes);
        res.json(eventTypes);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }
  
export const createEventType = async(req, res, next) => {
    try {
        const eventType = req.body;
        const newEventType = new EventTypeModel(eventType);
        await newEventType.save();
        res.json(eventType); 
        console.log(eventType);
      } catch (err) {
        next(err);
        console.log(err);
      }
  }