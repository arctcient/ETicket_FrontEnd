// src/pages/user/MyTicket.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../../layouts/UserNavbar';

export default function MyTicket() {
  const location = useLocation();
  const navigate = useNavigate();

  const dummyUser = {
    nama: 'Ikhsan Khoirul',
    foto: 'https://via.placeholder.com/50',
  };

  // Ambil data dari state yang dilempar saat redirect
  const tiket = location.state?.tiket;

  return (
    <>
      <UserNavbar user={dummyUser} />
      <div className="container my-5">
        <h3 className="mb-4">Tiket Saya</h3>

        {!tiket ? (
          <div className="text-muted">Kamu belum memesan tiket.</div>
        ) : (
          <div className="card shadow-sm">
            <img
              src={tiket.gambar}
              className="card-img-top"
              alt={tiket.nama}
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h4 className="card-title">{tiket.nama}</h4>
              <p className="text-muted">{tiket.lokasi}</p>
              <p>Harga: Rp{tiket.harga.toLocaleString()}</p>
              <p>{tiket.deskripsi}</p>
              <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
