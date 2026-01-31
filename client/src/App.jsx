import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navigation from './components/Navigation';
import MenuManagement from './pages/MenuManagement';
import OrdersDashboard from './pages/OrdersDashboard';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MenuManagement />} />
              <Route path="/orders" element={<OrdersDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
