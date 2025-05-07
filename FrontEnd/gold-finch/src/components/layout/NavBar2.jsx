import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%',
      boxSizing: 'border-box',
      position: 'sticky',  // This makes it sticky
      top: 0,              // Stick it to the top of the viewport
      zIndex: 1000         // Make sure it's above other content
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#4CAF50' // Using the green from our theme
      }}>
        GOLDFINCH TEAS
      </div>
      
      <div style={{
        display: 'flex',
        gap: '2rem'
      }}>
        
        <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }} >Home</NavLink>
        <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }} >Shop</NavLink>
        <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }} >About</NavLink>
        <NavLink to="/" style={{ color: 'white', textDecoration: 'none' }} >Contact</NavLink>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <div style={{
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}>
          🛒
        </div>
        <div style={{
          cursor: 'pointer'
        }}>
          Logout
        </div>
      </div>
    </div>
  );
}
