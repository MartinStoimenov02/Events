// App.js
import "./style/App.css";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ActiveEventsList from "./pages/ActiveEventsList";
import BuyATicket from "./pages/BuyATicket"
import PayTickets from "./pages/PayTickets"; 
import SuccessOrdered from "./pages/SuccessOrdered";
import React, { useState } from "react";

function App() {
  document.title = "Events!";
  const [modalIsOpen, setModalIsOpen] = useState(false); // Initialize modalIsOpen as false

  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ActiveEventsList setModalIsOpen={setModalIsOpen} />} />
        <Route path="/buyTicket/:eventId"element={<BuyATicket/>}/>
        <Route path="/payTickets/:totalPrice/:selectedTickets/" element={<PayTickets/>} />
        <Route path="/successOrdered/:totalPrice/:selectedTickets/:email/:name" element={<SuccessOrdered/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
