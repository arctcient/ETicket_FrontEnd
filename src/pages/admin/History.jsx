import React, { useState } from 'react';
import AdminNavbar from '../../layouts/AdminNavbar';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function History() {
    const admin = {
        nama: 'Admin Satu',
        foto: '',
    };

    const [search, setSearch] = useState('');
    const [transaksi, setTransaksi] = useState([
        {
            id: 1,
            namaUser: 'Budi',
            tempatWisata: 'Taman Safari',
            tanggal: '2025-08-05',
            jumlah: 2,
            totalHarga: 100000
        },
        {
            id: 2,
            namaUser: 'Sari',
            tempatWisata: 'Dufan',
            tanggal: '2025-08-04',
            jumlah: 4,
            totalHarga: 200000
        },
        {
            id: 3,
            namaUser: 'Andi',
            tempatWisata: 'Trans Studio',
            tanggal: '2025-08-03',
            jumlah: 1,
            totalHarga: 75000
        }
    ]);

    const handleDelete = (id) => {
        const konfirmasi = window.confirm('Yakin ingin menghapus tiket ini?');
        if (konfirmasi) {
            setTransaksi((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const filtered = transaksi.filter((t) =>
        t.namaUser.toLowerCase().includes(search.toLowerCase()) ||
        t.tempatWisata.toLowerCase().includes(search.toLowerCase())
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

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama User</th>
                            <th>Tempat Wisata</th>
                            <th>Tanggal Pesan</th>
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
                                    <td>{t.namaUser}</td>
                                    <td>{t.tempatWisata}</td>
                                    <td>{t.tanggal}</td>
                                    <td>{t.jumlah}</td>
                                    <td>Rp {t.totalHarga.toLocaleString('id-ID')}</td>
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
                                <td colSpan="7" className="text-center">
                                    Tidak ada data transaksi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
