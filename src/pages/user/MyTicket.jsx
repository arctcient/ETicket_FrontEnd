// src/pages/user/MyTicket.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../../layouts/UserNavbar';

export default function MyTicket() {
  const [tiketList, setTiketList] = useState([]);

  const dummyUser = {
    nama: 'Ikhsan Khoirul',
    foto: 'https://via.placeholder.com/50',
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/transaksi')
      .then(response => {
        setTiketList(response.data);
      })
      .catch(error => {
        console.error('Gagal mengambil tiket:', error);
      });
  }, []);

  return (
    <>
      <UserNavbar user={dummyUser} />
      <div className="container my-5">
        <h3 className="mb-4">Tiket Saya</h3>

        {tiketList.length === 0 ? (
          <p>Belum ada tiket.</p>
        ) : (
          tiketList.map((tiket) => (
            <div key={tiket.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <h4 className="card-title">{tiket.tempat_wisata?.nama}</h4>
                <p className="text-muted">{tiket.tempat_wisata?.lokasi}</p>
                <p>Tanggal Kunjungan: {tiket.tanggal_kunjungan}</p>
                <p>Jumlah Tiket: {tiket.jumlah_tiket}</p>
                <p>Total Harga: Rp {parseInt(tiket.total_harga).toLocaleString()}</p>
                <p>{tiket.tempat_wisata?.deskripsi}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
