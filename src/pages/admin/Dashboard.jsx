import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../layouts/AdminNavbar';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const admin = {
    nama: 'Admin Satu',
    foto: '',
  };
  // Dummy data
  const totalWisata = 10;
  const totalTransaksi = 25;

  return (
    <div>
      <AdminNavbar admin={admin} />

      <div className="container my-5">
        <h2 className="mb-4">Selamat Datang, Admin!</h2>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title>Total Wisata</Card.Title>
                <h3>{totalWisata}</h3>
                <Button variant="primary" onClick={() => navigate('/admin/wisata')}>
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
                <Button variant="success" onClick={() => navigate('/admin/history')}>
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
              Gunakan menu navigasi di atas untuk mengelola tempat wisata, melihat riwayat pemesanan, dan mengatur sistem.
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
