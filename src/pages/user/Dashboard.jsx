// src/pages/user/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import UserNavbar from '../../layouts/UserNavbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const dummyUser = {
    nama: 'Ikhsan Khoirul',
    foto: 'https://via.placeholder.com/50',
  };

  // iki misal lek wes dadi api ne
  // useEffect(() => {
  //   axios.get('URL_API').then(...);
  // }, []);

  const dummyWisata = [
    {
      id: 1,
      nama: 'Pantai Kuta',
      lokasi: 'Bali',
      deskripsi: 'Pantai indah dengan pasir putih dan ombak yang cocok untuk surfing.',
      harga: 50000,
      gambar: 'https://source.unsplash.com/400x300/?beach',
    },
    {
      id: 2,
      nama: 'Candi Borobudur',
      lokasi: 'Magelang',
      deskripsi: 'Candi Buddha terbesar di dunia yang kaya akan sejarah dan budaya.',
      harga: 75000,
      gambar: 'https://source.unsplash.com/400x300/?temple',
    },
    {
      id: 3,
      nama: 'Gunung Bromo',
      lokasi: 'Jawa Timur',
      deskripsi: 'Gunung berapi aktif dengan pemandangan matahari terbit yang menakjubkan.',
      harga: 100000,
      gambar: 'https://source.unsplash.com/400x300/?mountain',
    },
  ];

  const [wisataList, setWisataList] = useState(dummyWisata);
  const [filtered, setFiltered] = useState(dummyWisata);
  const [search, setSearch] = useState('');
  const [maxHarga, setMaxHarga] = useState('');

  useEffect(() => {
    filterData();
  }, [search, maxHarga]);

  const filterData = () => {
    let result = [...wisataList];

    if (search) {
      result = result.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (maxHarga) {
      result = result.filter((item) => item.harga <= parseInt(maxHarga));
    }

    setFiltered(result);
  };

  return (
    <>
      <UserNavbar user={dummyUser} />

      <div className="container my-4">
        <h3 className="mb-4">Tempat Wisata Tersedia</h3>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Cari tempat wisata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Filter harga maksimal"
              value={maxHarga}
              onChange={(e) => setMaxHarga(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          {filtered.length === 0 ? (
            <div className="text-center text-muted">Tidak ada tempat wisata ditemukan.</div>
          ) : (
            filtered.map((item) => (
              <div className="col-md-4 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.gambar}
                    className="card-img-top"
                    alt={item.nama}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.nama}</h5>
                    <p className="card-text text-muted">Harga: Rp{item.harga.toLocaleString()}</p>
                    <p className="card-text">{item.deskripsi}</p>
                    <Link to={`/detail/${item.id}`} className="btn btn-primary mt-auto">
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
