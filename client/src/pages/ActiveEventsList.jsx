import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/EventsStyle.css';

function ActiveEventsList() {
  const [listOfActiveEvents, setListOfActiveEvents] = useState([]);

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/events/getActiveEvents');
        const events = response.data;

        // Fetch details of each place
        const eventsWithPlaceDetails = await Promise.all(
          events.map(async (event) => {
            const placeResponse = await Axios.get(`http://localhost:3001/places/getPlaceById/${event.placeId}`);
            const place = placeResponse.data;
            return { ...event, place };
          })
        );

        setListOfActiveEvents(eventsWithPlaceDetails);
      } catch (error) {
        console.error('Error fetching active events:', error);
      }
    };

    fetchActiveEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} г.` + '\n' + `${hours}:${minutes}`;
  };

  return (
    <body className="event">
      <div className="eventsDisplay">
        {listOfActiveEvents.map((event) => (
          <div key={event._id}>
            <Link className="ticket-link" to={`/SpecifiedEvent/${event._id}`}>
              <div className="ticket">
                <div className="ticket-image">
                  <img src={event.imagePath} alt={event.title} />
                </div>
                <div className="ticket-details">
                  <div className="ticket-date">{formatDate(event.dateAndTime)}</div>
                  <div className="ticket-content">
                    <h1 className="ticket-title">{event.title}</h1>
                    <div className="place-details">
                      <h3 className="ticket-place-title">{event.place.title}</h3>
                      <p className="ticket-address">{event.place.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </body>
  );
}

export default ActiveEventsList;
