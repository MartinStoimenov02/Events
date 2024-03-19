// App.js
import "./style/App.css";
import Axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ActiveEventsList from "./pages/ActiveEventsList";
import BuyATicket from "./pages/BuyATicket"
import React, { useState } from "react";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Initialize modalIsOpen as false

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ActiveEventsList setModalIsOpen={setModalIsOpen} />} />
        <Route path="/buyTicket/:eventId"element={<BuyATicket/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
