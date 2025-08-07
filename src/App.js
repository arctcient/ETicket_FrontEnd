// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import AppRoutes from './routes';
import CreateTicket from './pages/user/CreateTicket';
// import Login from './pages/Login'; // pastikan file ini memang ada

function App() {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    setRole(storedRole);
    setToken(storedToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Semua route lain (dashboard, detail, dll) */}
        <Route path="/*" element={<AppRoutes role={role} />} />

        {/* Halaman CreateTicket bisa diakses siapa saja */}
        <Route path="/create-ticket" element={<CreateTicket />} />

        {/* Halaman login */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
