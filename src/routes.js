import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import UserDashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import MyTicket from './pages/user/MyTicket';
import WisataDetail from './pages/user/WisataDetail';

import AdminDashboard from './pages/admin/Dashboard';
import WisataCRUD from './pages/admin/WisataCRUD';
import AdminHistory from './pages/admin/History';

export default function AppRoutes({ role }) {
  if (!role) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (role === 'admin') {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/wisata" element={<WisataCRUD />} />
        <Route path="/admin/history" element={<AdminHistory />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/detail/:id" element={<WisataDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-ticket" element={<MyTicket />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}