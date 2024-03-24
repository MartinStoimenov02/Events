import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SuccessOrderStyle from "../style/SuccessOrderStyle.css";

function SuccessOrder() {
  const { totalPrice, selectedTickets, email, name } = useParams();
  const ticketsArray = JSON.parse(selectedTickets);

  useEffect(() => {
    const assignUserIdAndSendEmail = async () => {
      try {
        const updatedTickets = ticketsArray.map((ticket) => ({
          ...ticket
        }));
        console.log("updatedTickets: "+JSON.stringify(updatedTickets));
        await axios.put('http://localhost:3001/tickets/updateTickets', { updatedTickets });
        await axios.post('http://localhost:3001/email/sendEmail', { email, totalPrice, updatedTickets, name });
      } catch (error) { 
        console.error("Error occurred:", error);
      }
    };

    assignUserIdAndSendEmail();
  }, [email, totalPrice, ticketsArray]);

  return (
    <div className="success-container">
      <div className="success-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green"
          width="100px"
          height="100px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.2l-4.8-4.6-2.7 2.7L9 21 21 9l-2.7-2.7-6.3 6.3-2.7-2.8z" />
        </svg>
      </div>
      <div className="success-message">
       <h2>Браво {name}!</h2>
       <p>Вие успешно заявихте вашите билети за взeмане от билетен център!<br></br><br></br>
        Можете да вземете своите билети в срок до 1 седмица преди събитието! <br></br><br></br>
        <b>Копие на това съобщение ще получите и на дадения имейл: {email}!</b><br></br><br></br>
        За да бъдете верифицирани на място на касите ни, ще трябва да цитирате следните номера: </p>
        <ul className="ordered-tickets-list">
          {ticketsArray.map((ticket, index) => (
            <li key={index}><b>{ticket._id}</b></li>
          ))}
        </ul>
        <h3><i>Общата стойност, която е необходимо да заплатите за Вашите билети е: </i><b>{totalPrice} лв.</b></h3>
        <Link to="/" className="back-to-home-btn">Back to Home</Link><br></br><br></br>
      </div>
    </div>
  );
}

export default SuccessOrder;
