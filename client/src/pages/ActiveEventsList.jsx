import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/EventsStyle.css';

function ActiveEventsList() {
    const [listOfActiveEvents, setListOfActiveEvents] = useState([]);
    useEffect(() => {
      const fetchActiveEvents = async () => {
          try {
              const response = await Axios.get("http://localhost:3001/events/getActiveEvents");
              const events = response.data;
              // Fetch details of each place
              const eventsWithPlaceDetails = await Promise.all(events.map(async (event) => {
                  const placeResponse = await Axios.get(`http://localhost:3001/places/getPlaceById/${event.placeId}`);
                  const place = placeResponse.data;
                  return { ...event, place };
              }));
              setListOfActiveEvents(eventsWithPlaceDetails);
          } catch (error) {
              console.error("Error fetching active events:", error);
          }
      };
      fetchActiveEvents();
  }, []);

  console.log("listOfActiveEvents: "+listOfActiveEvents)

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        
        return `${day}.${month}.${year} г. \n ${hours}:${minutes}`;
    };

    //console.log("listOfActiveEvents: "+listOfActiveEvents)

    return(
      <body class="event">
        <div className='eventsDisplay'>
          {listOfActiveEvents.map((event) => {
            return (
              <div>
                <table class="events">
                  <tr>
                    <td width="20%">
                    <Link class="events"
                            to={`/SpecifiedEvent/${event._id}`}
                          >
                          <img src={event.imagePath} width="100%" height="100%"/>
                          </Link>
                      </td>
                    <td width="60%">
                      <tr>
                        <td style={{ textAlign: 'center' }}>
                          <Link class="events"
                            to={`/SpecifiedEvent/${event._id}`}
                          >
                          <h1 class='event'><i>{event.title}</i></h1>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td width="20%" style={{ textAlign: 'center' }}> 
                          <font><i>{event.place.address}</i></font>
                        </td>
                        
                      </tr>
                    </td>
                    <td width="20%" style={{ borderLeft: '1px solid black', textAlign: 'center' }}>
                      <font><i>{formatDate(event.dateAndTime)}</i></font>
                    </td>
                  </tr>
                </table>   
                <hr width="100%"></hr>
              </div>
            );
          })}
        </div>
      </body>
    )
}

export default ActiveEventsList;