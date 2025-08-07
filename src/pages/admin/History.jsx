// src/pages/admin/History.jsx

import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../layouts/AdminNavbar';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function History() {
  const admin = {
    nama: 'Admin Satu',
    foto: '',
  };

  const [search, setSearch] = useState('');
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data transaksi dari API
  useEffect(() => {
    fetchTransaksi();
  }, []);

  const fetchTransaksi = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/transaksi');
      setTransaksi(res.data);
    } catch (error) {
      console.error('Gagal memuat transaksi:', error);
      alert('Gagal memuat data transaksi');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi hapus transaksi
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus tiket ini?')) {
      try {
        await axios.delete(`http://localhost:8000/api/transaksi/${id}`);
        alert('Transaksi berhasil dihapus');
        fetchTransaksi();
      } catch (error) {
        console.error('Gagal hapus transaksi:', error);
        alert('Terjadi kesalahan saat menghapus transaksi');
      }
    }
  };

  // Format harga ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(angka);
  };

  // Filter transaksi berdasarkan nama user atau wisata
  const filtered = transaksi.filter((t) =>
    (t.user?.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (t.tempat_wisata?.nama?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminNavbar admin={admin} />

      <div className="container my-5">
        <h2 className="mb-4">Kelola Tiket</h2>

        <Form.Control
          type="text"
          placeholder="Cari nama user atau tempat wisata..."
          className="mb-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Memuat data transaksi...</p>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama User</th>
                <th>Tempat Wisata</th>
                <th>Tanggal Kunjungan</th>
                <th>Tanggal Pembelian</th>
                <th>Jumlah Tiket</th>
                <th>Total Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((t, index) => (
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>{t.user?.name}</td>
                    <td>{t.tempat_wisata?.nama}</td>
                    <td>{t.tanggal_kunjungan}</td>
                    <td>{new Date(t.created_at).toLocaleDateString('id-ID')}</td>
                    <td>{t.jumlah_tiket}</td>
                    <td>{formatRupiah(t.total_harga)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(t.id)}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    Tidak ada data transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
