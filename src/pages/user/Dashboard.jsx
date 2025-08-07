// src/pages/user/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import UserNavbar from '../../layouts/UserNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const dummyUser = {
    nama: 'Ikhsan Khoirul',
    foto: 'https://via.placeholder.com/50',
  };

  const [wisataList, setWisataList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [maxHarga, setMaxHarga] = useState('');
  const [loading, setLoading] = useState(true);

  // Ambil data dari API Laravel
  useEffect(() => {
    fetchWisata();
  }, []);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://127.0.0.1:8000/api/tempat-wisata');
      setWisataList(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error('Gagal ambil data wisata:', error);
      alert('Gagal memuat data wisata');
    } finally {
      setLoading(false);
    }
  };

  // Filter pencarian & harga
  useEffect(() => {
    filterData();
  }, [search, maxHarga, wisataList]);

  const filterData = () => {
    let result = [...wisataList];

    if (search) {
      result = result.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (maxHarga) {
      result = result.filter(
        (item) => item.harga_tiket <= parseInt(maxHarga)
      );
    }

    setFiltered(result);
  };

  // Format harga ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(angka);
  };

  return (
    <>
      <UserNavbar user={dummyUser} />

      <div className="container my-4">
        <h3 className="mb-4">Tempat Wisata Tersedia</h3>

        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cari tempat wisata..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Filter harga maksimal"
              value={maxHarga}
              onChange={(e) => setMaxHarga(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-muted">Memuat data...</div>
        ) : (
          <div className="row">
            {filtered.length === 0 ? (
              <div className="text-center text-muted">
                Tidak ada tempat wisata ditemukan.
              </div>
            ) : (
              filtered.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card h-100 shadow-sm">
                    {item.gambar && (
                      <img
                        src={item.gambar}
                        className="card-img-top"
                        alt={item.nama}
                        style={{ objectFit: 'cover', height: '200px' }}
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.nama}</h5>
                      <p className="card-text text-muted">
                        Lokasi: {item.lokasi}
                      </p>
                      <p className="card-text text-primary fw-bold">
                        Harga: {formatRupiah(item.harga_tiket)}
                      </p>
                      <p className="card-text">{item.deskripsi}</p>
                      <Link
                        to={`/detail/${item.id}`}
                        className="btn btn-primary mt-auto"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}