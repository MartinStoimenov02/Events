import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../style/ChooseTicketsStyle.css";

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
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

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
      const selectedSeat = linkedPlaceSeats.find(
        seat => seat.sector === selectedSector && seat.row === parseInt(selectedRow) && seat.col === parseInt(selectedCol)
      );
  
      if (selectedSeat) {
        const linkedTicket = availableTickets.find(ticket => ticket.seatId === selectedSeat._id);
        console.log("linkedTicket: "+linkedTicket._id);
  
        if (linkedTicket) {
          const ticketToAdd = {
            _id: linkedTicket._id, // Include the _id
            sector: selectedSector,
            row: selectedRow,
            col: selectedCol,
            price: ticketPrice
          };
          setSelectedTickets([...selectedTickets, ticketToAdd]);
          setTotalPrice(totalPrice + ticketPrice);
          //availableColumns
        }
      }
    }
  };
  

  useEffect(() => {
    if (placeDetails && placeDetails.imagePath) {
      const image = new Image();
      image.src = placeDetails.imagePath;
      image.onload = () => {
        setImageScale(1); // Reset image scale on image change
      };
    }
  }, [placeDetails]);

  const handleRemoveTicket = (index) => {
    const ticketToRemove = selectedTickets[index];
    setSelectedTickets(selectedTickets.filter((ticket, i) => i !== index));
    setTotalPrice(totalPrice - ticketToRemove.price);
  };

  const handleZoomIn = () => {
    setImageScale(imageScale => imageScale * 1.1);
  };
  
  const handleZoomOut = () => {
    setImageScale(imageScale => Math.max(0.1, imageScale * 0.9));
  };

  return (
    <div className="container-ticket">
      <table width="100%" border="1">
        <tbody>
          <tr>
            <td width="60%">
              <div className="image-container-ticket">
                {placeDetails && placeDetails.imagePath && (
                    <img
                      src={placeDetails.imagePath}
                      alt="Place"
                      className="event-ticket-image"
                      style={{
                        transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
                      }}
                    />
                )}
                <div className="zoom-buttons-ticket">
                  <button onClick={handleZoomIn}>+</button>
                  <button onClick={handleZoomOut}>-</button>
                </div>
              </div>
            </td>
            <td className="price-paragraph-ticket" style={{textAlign: "center"}}>
              <select onChange={(e) => setSelectedSector(e.target.value)}>
                <option value="">Сектор</option>
                {availableSectors &&
                  availableSectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
              </select>
              <select onChange={(e) => setSelectedRow(e.target.value)}>
                <option value="">Ред</option>
                {availableRows &&
                  availableRows.map((row) => (
                    <option key={row} value={row}>
                      {row}
                    </option>
                  ))}
              </select>
              <select onChange={(e) => setSelectedCol(e.target.value)}>
                <option value="">Място</option>
                {availableColumns &&
                  availableColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
              </select>
              <p><i>Цена на билета:</i><b>{ticketPrice} лв.</b> </p>
              <button className="btn-ticket btn-primary" onClick={handleAddToSelectedTickets}>Добави билета</button>
              <ul className="added-tickets-list-ticket">
                {selectedTickets.map((ticket, index) => (
                  <li key={index} >
                    Сектор: {ticket.sector}, Ред: {ticket.row}, Място: {ticket.col}, Цена: {ticket.price}
                    <button onClick={() => handleRemoveTicket(index)}>X</button>
                  </li>
                ))}
              </ul>
              <p><i>Общо: </i><b>{totalPrice} лв.</b></p>
              <Link className="btnPay-ticket btn-primary" to={`/payTickets/${totalPrice}/${JSON.stringify(selectedTickets)}`}>
                Плащане
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BuyATicket;

