// src/pages/admin/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../../layouts/AdminNavbar';

export default function Dashboard() {
  const navigate = useNavigate();

  const admin = {
    nama: 'Admin Satu',
    foto: '',
  };

  const [totalWisata, setTotalWisata] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [loading, setLoading] = useState(true);

  // Ambil data wisata & transaksi dari API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Ambil total wisata
      const wisataRes = await axios.get('http://localhost:8000/api/tempat-wisata');
      setTotalWisata(wisataRes.data.length);

      // Ambil total transaksi
      const transaksiRes = await axios.get('http://localhost:8000/api/transaksi');
      setTotalTransaksi(transaksiRes.data.length);

    } catch (error) {
      console.error('Gagal memuat data:', error);
      alert('Terjadi kesalahan saat memuat data dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar admin={admin} />

      <div className="container my-5">
        <h2 className="mb-4">Selamat Datang, Admin!</h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p>Memuat data...</p>
          </div>
        ) : (
          <>
            <Row className="mb-4">
              <Col md={6}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <Card.Title>Total Wisata</Card.Title>
                    <h3>{totalWisata}</h3>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/admin/wisata')}
                    >
                      Kelola Wisata
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <Card.Title>Total Transaksi</Card.Title>
                    <h3>{totalTransaksi}</h3>
                    <Button
                      variant="success"
                      onClick={() => navigate('/admin/history')}
                    >
                      Lihat Riwayat
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="border-light shadow-sm">
              <Card.Body>
                <Card.Title>Informasi</Card.Title>
                <p>
                  Gunakan menu navigasi di atas untuk mengelola tempat wisata,
                  melihat riwayat pemesanan, dan mengatur sistem.
                </p>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
