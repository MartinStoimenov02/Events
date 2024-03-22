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
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedCol, setSelectedCol] = useState("");
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [availableSectors, setAvailableSectors] = useState([]);
  const [availableRows, setAvailableRows] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await Axios.get(
          `http://localhost:3001/events/getEventById/${eventId}`
        );
        setEventDetails(eventResponse.data);

        const placeResponse = await Axios.get(
          `http://localhost:3001/places/getPlaceById/${eventResponse.data.placeId}`
        );
        setPlaceDetails(placeResponse.data);

        const ticketResponse = await Axios.get(
          `http://localhost:3001/tickets/getActiveTicketsByEventId/${eventId}/${eventResponse.data.placeId}`
        );
        setAvailableTickets(ticketResponse.data);

        const placeSeatIds = ticketResponse.data.map(ticket => ticket.seatId);
        const linkedPlaceSeatsResponse = await Axios.post(`http://localhost:3001/placeSeats/getPlaceSeatsByIds`, { placeSeatIds: placeSeatIds });
        setLinkedPlaceSeats(linkedPlaceSeatsResponse.data);

        const sectors = [...new Set(linkedPlaceSeatsResponse.data.map(seat => seat.sector))];
        setAvailableSectors(sectors);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    if (selectedSector) {
      const rows = linkedPlaceSeats
        .filter(seat => seat.sector === selectedSector)
        .map(seat => seat.row);
      setAvailableRows([...new Set(rows)]);

      const columns = linkedPlaceSeats
        .filter(seat => seat.sector === selectedSector && seat.row === parseInt(selectedRow))
        .map(seat => seat.col);
      setAvailableColumns(columns);
    } else {
      setAvailableRows([]);
      setAvailableColumns([]);
      setSelectedRow("");
      setSelectedCol("");
    }
  }, [selectedSector, selectedRow, linkedPlaceSeats]);

  useEffect(() => {
    if (selectedSector && selectedRow && selectedCol) {
      const selectedSeat = linkedPlaceSeats.find(
        seat => seat.sector === selectedSector && seat.row === parseInt(selectedRow) && seat.col === parseInt(selectedCol)
      );

      if (selectedSeat) {
        const linkedTicket = availableTickets.find(ticket => ticket.seatId === selectedSeat._id);

        if (linkedTicket) {
          setTicketPrice(parseFloat(linkedTicket.seatPrice.$numberDecimal));
        } else {
          setTicketPrice(0);
        }
      }
    } else {
      setTicketPrice(0);
    }
  }, [selectedSector, selectedRow, selectedCol, linkedPlaceSeats, availableTickets]);

  const handleAddToSelectedTickets = () => {
    if (selectedSector && selectedRow && selectedCol && ticketPrice > 0) {
      setSelectedTickets([...selectedTickets, { sector: selectedSector, row: selectedRow, col: selectedCol, price: ticketPrice }]);
      setTotalPrice(totalPrice + ticketPrice);
    }
  };

  const handleRemoveTicket = (index) => {
    const ticketToRemove = selectedTickets[index];
    setSelectedTickets(selectedTickets.filter((ticket, i) => i !== index));
    setTotalPrice(totalPrice - ticketToRemove.price);
  };

  const handleZoomIn = () => {
    setImageScale(imageScale + 0.1);
  };

  const handleZoomOut = () => {
    if (imageScale > 0.2) { // Limiting zoom out to prevent negative or too small scale
      setImageScale(imageScale - 0.1);
    }
  };

  return (
    <div className="container">
      <table width="100%" border="1">
        <tbody>
          <tr>
            <td width="60%">
              {placeDetails && (
                <img
                  src={placeDetails.imagePath}
                  alt="Place"
                  style={{ transform: `scale(${imageScale})` }}
                />
              )}
            </td>
            <td style={{textAlign: "center"}}>
              <select onChange={(e) => setSelectedSector(e.target.value)}>
                <option value="">Select Sector</option>
                {availableSectors &&
                  availableSectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
              </select>
              <select onChange={(e) => setSelectedRow(e.target.value)}>
                <option value="">Select Row</option>
                {availableRows &&
                  availableRows.map((row) => (
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
              <p>Цена на билета: {ticketPrice} лв.</p>
              <button className="btn btn-primary" onClick={handleAddToSelectedTickets}>Добави билета</button>
              <ul>
                {selectedTickets.map((ticket, index) => (
                  <li key={index} >
                    Сектор: {ticket.sector}, Ред: {ticket.row}, Място: {ticket.col}, Цена: {ticket.price}
                    <button onClick={() => handleRemoveTicket(index)}>X</button>
                  </li>
                ))}
              </ul>
              <p>Общо: {totalPrice} лв.</p>
              <button className="btnPay btn-primary" onClick={() => console.log("Redirect to PayATicket page")}>
                Плащане
              </button>
              <div>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    );
}

export default BuyATicket;
