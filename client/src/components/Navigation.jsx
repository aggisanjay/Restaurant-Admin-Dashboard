import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>🍽️ Restaurant Admin</h2>
        </div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Menu Management
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>
            Orders Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;