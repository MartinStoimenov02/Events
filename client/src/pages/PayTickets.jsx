import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../style/PayTickets.css"; 
import { toast } from "react-toastify";

function PayTickets(props) {
  const { totalPrice, selectedTickets } = useParams();
  const ticketsArray = JSON.parse(selectedTickets);
  const navigate = useNavigate();

  // State for cash payment form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);


  // Function to handle cash payment form submission
  const handleCashPayment = (e) => {
    e.preventDefault();
    // Add logic to handle cash payment (e.g., sending data to server)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Agree to Policy:", agreeToPolicy);
    console.log("Tickets:", ticketsArray);
    console.log("Total Price:", totalPrice);
    navigate(`/successOrdered/${totalPrice}/${selectedTickets}/${email}/${name}`);
  };

  return (
    <div className="pay-tickets-container">
      <h2>Плащане</h2>
      <div className="tabs-summary-container">
        <Tabs className="tabs-container">
          <TabList>
            <Tab>На каса</Tab>
            <Tab>С карта</Tab>
          </TabList>

          <div className="tab-content">
            <TabPanel>
              <form onSubmit={handleCashPayment} className="cash-payment-form">
                <div className="form-group">
                  <label htmlFor="name">Имена:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Име Презиме Фамилия"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="example@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Телефонен номер:</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="08XXXXXXXX"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    id="agreeToPolicy"
                    checked={agreeToPolicy}
                    onChange={(e) => setAgreeToPolicy(e.target.checked)}
                    required
                  />Съгласен съм с Общите условия
                </div>
                <button type="submit" className="buy-tickets-btn">
                  Направи плащането
                </button>
              </form>
            </TabPanel>
            <TabPanel>
              {/* Debit/Credit Card Payment Form */}
              <p>Debit/Credit Card Payment</p>
            </TabPanel>
          </div>
        </Tabs>

        {/* Order Summary */}
        <div className="summary-container">
          <h3>Информация за поръчката:</h3>
          <ul>
            {ticketsArray.map((ticket, index) => (
              <li key={index}>
                Сектор: {ticket.sector}, Ред: {ticket.row}, Място:{" "}
                {ticket.col}, Цена: {ticket.price} лв.
              </li>
            ))}
          </ul>
          <h4>Общо: {totalPrice} лв.</h4>
        </div>
      </div>
    </div>
  );
}

export default PayTickets;
