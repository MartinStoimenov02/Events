import React from 'react';
import { Link } from 'react-router-dom'; // Make sure you have imported Link from react-router-dom

// Import your profile picture
import profilePicture from './profile.jpg'; // Replace './profile.jpg' with the path to your profile picture

const Header = () => {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        {/* Add more navigation tabs as needed */}
      </nav>
      <h1 style={titleStyle}>Events</h1>
      <div style={profileStyle}>
        <img src={profilePicture} alt="Profile" style={profileImgStyle} />
      </div>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
}

const profileStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#ccc', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const profileImgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', 
}

const titleStyle = {
  margin: '0',
}

const navStyle = {
  display: 'flex',
  alignItems: 'center',
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '0 10px',
}

export default Header;
