import {useState, useEffect} from "react";
import Axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom";

const SpecifiedEvent = props=> {
  const event = useParams();
  const eventId = event.eventId;
  const [currentEvent, setCurrentEvent] = useState([]);
  

  console.log("id: "+JSON.stringify(eventId));

  useEffect(() => {
    // pass the endpoint url
    Axios.get(`http://localhost:3001/getEventById/${eventId}`).then((response) => {
      setCurrentEvent(response.data);
    });
  }, []);

  console.log(currentEvent);

  return (
      <div className='currentEvent'>
            <div>
              {currentEvent.title}
            </div>
      </div>
  );
}

export default SpecifiedEvent;