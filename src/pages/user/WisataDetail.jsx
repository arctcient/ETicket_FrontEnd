// src/pages/user/WisataDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserNavbar from '../../layouts/UserNavbar';

export default function WisataDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Dummy user untuk navbar
    const dummyUser = {
        nama: 'Ikhsan Khoirul',
        foto: 'https://via.placeholder.com/50',
    };

    // Dummy data yang sama dengan dashboard
    const wisataList = [
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

    const detail = wisataList.find((item) => item.id === parseInt(id));

    if (!detail) {
        return (
            <>
                <UserNavbar user={dummyUser} />
                <div className="container my-5 text-center">
                    <h3>Wisata tidak ditemukan</h3>
                </div>
            </>
        );
    }

    return (
        <>
            <UserNavbar user={dummyUser} />
            <div className="container my-5">
                <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
                    ← Kembali
                </button>
                <div className="card shadow-sm">
                    <img
                        src={detail.gambar}
                        className="card-img-top"
                        alt={detail.nama}
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                        <h3 className="card-title">{detail.nama}</h3>
                        <p className="text-muted">{detail.lokasi}</p>
                        <h5>Harga: Rp{detail.harga.toLocaleString()}</h5>
                        <p className="card-text mt-3">{detail.deskripsi}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/my-ticket', { state: { tiket: detail } })}
                        >
                            Pesan Tiket
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
