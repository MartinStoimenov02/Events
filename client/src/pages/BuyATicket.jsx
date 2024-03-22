import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../style/EventStyle.css";

function BuyATicket() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [linkedPlaceSeats, setLinkedPlaceSeats] = useState([]);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [availableTickets, setAvailableTickets] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedCol, setSelectedCol] = useState("");
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [availableColumns, setAvailableColumns] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch event details
        const eventResponse = await Axios.get(
          `http://localhost:3001/events/getEventById/${eventId}`
        );
        setEventDetails(eventResponse.data);

        // Fetch place details based on the place ID from event details
        const placeResponse = await Axios.get(
          `http://localhost:3001/places/getPlaceById/${eventResponse.data.placeId}`
        );
        setPlaceDetails(placeResponse.data);

        // Fetch available tickets for the event
        const ticketResponse = await Axios.get(
          `http://localhost:3001/tickets/getActiveTicketsByEventId/${eventId}/${eventResponse.data.placeId}`
        );
        setAvailableTickets(ticketResponse.data);

        const placeSeatIds = await ticketResponse.data.map(ticket => ticket.seatId);
        const linkedPlaceSeatsResponse = await Axios.post(`http://localhost:3001/placeSeats/getPlaceSeatsByIds`, { placeSeatIds: placeSeatIds });
        setLinkedPlaceSeats(linkedPlaceSeatsResponse.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Update column combobox when a row is selected
  useEffect(() => {
    if (selectedRow) {
      console.log("selectedRow:", typeof(parseInt(selectedRow)));
      // Filter available columns based on the selected row
      const columns = linkedPlaceSeats
        .filter(seat => seat.row === parseInt(selectedRow))
        .map(seat => seat.col);
      // Set available columns
      console.log("columns:", columns);
      setAvailableColumns(columns);
    } else{
      setTicketPrice(0);
    }
  }, [selectedRow, linkedPlaceSeats]);

  // Calculate ticket price when both row and column are selected
  useEffect(() => {
    if (selectedRow && selectedCol) {
      console.log("selectedRow: ", selectedRow);
      console.log("selectedCol: ", selectedCol);
      // Find the seat with the selected row and column
      const selectedSeat = linkedPlaceSeats.find(
        seat => seat.row === parseInt(selectedRow) && seat.col === parseInt(selectedCol)
      );
      console.log("selectedSeat: ", selectedSeat);

      // If seat is found, find the linked ticket
      if (selectedSeat) {
        const linkedTicket = availableTickets.find(ticket => ticket.seatId === selectedSeat._id);

        // Update ticket price
        if (linkedTicket) {
          console.log("linkedTicket: ", linkedTicket);
          console.log("linkedTicket: ", linkedTicket.seatPrice.$numberDecimal);
          setTicketPrice(parseFloat(linkedTicket.seatPrice.$numberDecimal));
        } else {
          setTicketPrice(0);
        }
      }
    }else{
      setTicketPrice(0);
    }
  }, [selectedRow, selectedCol, linkedPlaceSeats, availableTickets]);

  console.log("ticketPrice: ", ticketPrice);
  // Handle adding selected ticket to the list of selectedTickets
  const handleAddToSelectedTickets = () => {
    if (selectedRow && selectedCol && ticketPrice > 0) {
      // Add the selected ticket to the list of selectedTickets
      setSelectedTickets([...selectedTickets, { row: selectedRow, col: selectedCol, price: ticketPrice }]);
      // Update total price
      setTotalPrice(totalPrice + ticketPrice);
    }
  };

  // Handle removing a ticket from selectedTickets
  const handleRemoveTicket = (index) => {
    const ticketToRemove = selectedTickets[index];
    // Remove the ticket from selectedTickets
    setSelectedTickets(selectedTickets.filter((ticket, i) => i !== index));
    // Subtract the ticket price from total price
    setTotalPrice(totalPrice - ticketToRemove.price);
  };

  return (
    <div className="container">
      <table width="100%" border="1">
      <tr>
      <td width="60%">
        {/* Display the image of the place */}
        {placeDetails && <img src={placeDetails.imagePath} alt="Place" />}
      </td>
      <td style={{textAlign: "center"}}>
        <select onChange={(e) => setSelectedRow(e.target.value)}>
          <option value="">Select Row</option>
          {linkedPlaceSeats &&
            [...new Set(linkedPlaceSeats.map((seat) => seat.row))].map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
        </select>
        <select onChange={(e) => setSelectedCol(e.target.value)}>
          <option value="">Select Column</option>
          {availableColumns &&
            availableColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
        </select>
        <p>Ticket Price: {ticketPrice}</p>
        <button className="btn btn-primary" onClick={handleAddToSelectedTickets}>Add</button>
        <ul>
          {selectedTickets.map((ticket, index) => (
            <li key={index} >
              Row: {ticket.row}, Col: {ticket.col}, Price: {ticket.price}
              <button onClick={() => handleRemoveTicket(index)}>X</button>
            </li>
          ))}
        </ul>
        <p>Total Price: {totalPrice}</p>
        <button className="btnPay btn-primary" onClick={() => console.log("Redirect to PayATicket page")}>
          Pay
        </button>
      </td>
      </tr>
      </table>
    </div>
  );
}

export default BuyATicket;
