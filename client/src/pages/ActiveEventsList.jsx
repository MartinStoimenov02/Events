import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';

function ActiveEventsList() {
    const [listOfActiveEvents, setListOfActiveEvents] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/getActiveEvents").then((response) => {
            setListOfActiveEvents(response.data);
        });
      }, []);

    //console.log("listOfActiveEvents: "+listOfActiveEvents)

    return(
        <div className='eventsDisplay'>
          {listOfActiveEvents.map((event) => {
            return (
              <div>
                <table border="1">
                  <tr>
                    <td><a href={event.imagePath}><img src={event.imagePath}/></a></td>
                    <td>
                      <tr>
                        <td>
                          <Link 
                            to={`/SpecifiedEvent/${event._id}`}
                          >
                          <h3>{event.title}</h3>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <font>adress:</font>
                        </td>
                        
                      </tr>
                    </td>
                    <td>
                      <font>{event.dateAndTime}</font>
                    </td>
                  </tr>
                </table>       
              </div>
            );
          })}
        </div>
    )
}

export default ActiveEventsList;