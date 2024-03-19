// BuyATicket.js
import React, { useState, useEffect } from "react";
import Axios from "axios";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import "../style/EventsStyle.css";
import "../style/EventStyle.css";

function BuyATicket() {
  const [listOfActiveEvents, setListOfActiveEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3001/events/getActiveEvents"
        );
        const events = response.data;

        // Fetch details of each place
        const eventsWithPlaceDetails = await Promise.all(
          events.map(async (event) => {
            const placeResponse = await Axios.get(
              `http://localhost:3001/places/getPlaceById/${event.placeId}`
            );
            const place = placeResponse.data;
            return { ...event, place };
          })
        );

        setListOfActiveEvents(eventsWithPlaceDetails);
      } catch (error) {
        console.error("Error fetching active events:", error);
      }
    };

    fetchActiveEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} г.` + "\n" + `${hours}:${minutes}`;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true); // Open the modal
  };

  return (
    <body className="event">
      <div className="eventsDisplay">
        {listOfActiveEvents.map((event) => (
          <div key={event._id} onClick={() => handleEventClick(event)}> {/* Pass event object to handleEventClick */}
            <div className="ticket">
              <div className="ticket-image">
                <img src={event.imagePath} alt={event.title} />
              </div>
              <div className="ticket-details">
                <div className="ticket-date">
                  {formatDate(event.dateAndTime)}
                </div>
                <div className="ticket-content">
                  <h1 className="ticket-title">{event.title}</h1>
                  <div className="place-details">
                    <h3 className="ticket-place-title">
                      {event.place.title}
                    </h3>
                    <p className="ticket-address">{event.place.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Event Details Modal"
      >
        {selectedEvent && (
          <div className="event-container">
            <div className="event-details">
              <h1 className="event-title">{selectedEvent.title}</h1>
              <div className="event-info">
                <p>
                  <b>{formatDate(selectedEvent.dateAndTime)}</b>
                </p>
                <p>
                  <b>{selectedEvent.place.title}</b>
                </p>
                <p>{selectedEvent.place.address}</p>
              </div>
              <p className="event-description">
                <i>{selectedEvent.description}</i>
              </p>
              <Link
              to={`/buyTicket/${selectedEvent._id}`}
              className="btn btn-primary"
            >
              Купи Билети
            </Link>
            </div>
            <div className="event-image">
              <img src={selectedEvent.imagePath} alt={selectedEvent.title} />
            </div>
          </div>
        )}
      </ReactModal>
    </body>
  );
}

export default BuyATicket;
