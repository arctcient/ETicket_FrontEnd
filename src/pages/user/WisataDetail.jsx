// src/pages/user/WisataDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNavbar from "../../layouts/UserNavbar";
import axios from "axios";

export default function WisataDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy user untuk navbar
  const dummyUser = {
    nama: "Ikhsan Khoirul",
    foto: "https://via.placeholder.com/50",
  };

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/tempat-wisata/${id}`)
      .then((response) => {
        const wisataDetail = Array.isArray(response.data)
          ? response.data[0]
          : response.data.data || response.data;
        setDetail(wisataDetail);
      })
      .catch((error) => {
        console.error("Gagal mengambil detail wisata:", error);
      });
  }, [id]);

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
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h3 className="card-title">{detail.nama}</h3>
            <p className="text-muted">{detail.lokasi}</p>
            <h5>
              Harga: Rp{Number(detail?.harga_tiket || 0).toLocaleString()}
            </h5>
            <p className="card-text mt-3">{detail?.deskripsi}</p>
            <p className="text-muted">{detail?.lokasi}</p>

            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/create-ticket", { state: { tiket: detail } })
              }
            >
              Pesan Tiket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
