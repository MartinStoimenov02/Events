import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/EventsStyle.css';

function ActiveEventsList() {
    const [listOfActiveEvents, setListOfActiveEvents] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/events/getActiveEvents").then((response) => {
            setListOfActiveEvents(response.data);
        });
      }, []);

    //console.log("listOfActiveEvents: "+listOfActiveEvents)

    return(
      <body class="event">
        <div className='eventsDisplay'>
          {listOfActiveEvents.map((event) => {
            return (
              <div>
                <table class="events" border="1">
                  <tr>
                    <td width="20%"><a href={event.imagePath}><img src={event.imagePath} width="100%" height="100%"/></a></td>
                    <td width="60%">
                      <tr>
                        <td>
                          <Link class="events"
                            to={`/SpecifiedEvent/${event._id}`}
                          >
                          <h1 class='event'>{event.title}</h1>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td width="20%"> 
                          <font>adress:</font>
                        </td>
                        
                      </tr>
                    </td>
                    <td width="20%">
                      <font>{event.dateAndTime}</font>
                    </td>
                  </tr>
                </table>       
              </div>
            );
          })}
        </div>
      </body>
    )
}

export default ActiveEventsList;