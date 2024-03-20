import roleRoutes from './routes/role.route.js';
import userRoutes from './routes/user.route.js';
import eventRoutes from './routes/event.route.js';
import eventTypeRoutes from './routes/eventtype.route.js';
import placesRoutes from './routes/place.route.js';
import placeSeatRoutes from './routes/placeseat.route.js';
import favouriteEventsRoutes from './routes/favouriteevents.route.js';
import ticketRoutes from './routes/ticket.route.js';
import ticketStatusRoutes from './routes/ticketstatus.route.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
//without this every post request will give an error
app.use(express.json());
app.use(cors());


//env for database connection
await mongoose.connect("mongodb+srv://Martin:KXxbXTJz3c3Y4Vs6@events.grtk5vb.mongodb.net/?retryWrites=true&w=majority&appName=events");

app.use((err, req,res,next) => {
  const statusCode = err.statusCode || 500;
  // noinspection JSUnresolvedReference
  const message = err.message || 'Internal Server Error';
  const success = "false";
  // noinspection JSUnresolvedReference
  return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
  });
});

app.use("/roles", roleRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/eventtypes", eventTypeRoutes);
app.use("/places", placesRoutes);
app.use("/placeseats", placeSeatRoutes);
app.use('/favouriteevents', favouriteEventsRoutes);
app.use("/tickets", ticketRoutes);
app.use("/ticketstatuses", ticketStatusRoutes);

app.listen(3001, () => {
    console.log("server runs perfectly!");
});