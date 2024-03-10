import './App.css';
import Axios from 'axios';
import { BrowserRouter, Switch, Route, Link, Routes } from 'react-router-dom';
import Header from './components/Header';
import ActiveEventsList from './pages/ActiveEventsList';
import SpecifiedEvent from './pages/SpecifiedEvent';
import React from 'react';

function App() {
  console.log("app");
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<ActiveEventsList/>}/>
        <Route path='/SpecifiedEvent/:eventId' element={<SpecifiedEvent/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
