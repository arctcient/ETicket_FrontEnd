// src/pages/user/CreateTicket.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../layouts/UserNavbar";

export default function CreateTicket() {
  const navigate = useNavigate();
  const location = useLocation();
  const wisata = location.state?.tiket;

  const [jumlahTiket, setJumlahTiket] = useState(1);
  const [tanggal, setTanggal] = useState("");

  const dummyUser = {
    nama: "Ikhsan Khoirul",
    foto: "https://via.placeholder.com/50",
  };

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/transaksi", {
        tempat_wisata_id: wisata.id,
        jumlah_tiket: jumlahTiket,
        tanggal_kunjungan: tanggal,
      },{
        // headers:{
        //   Authorization: `Bearer ${}`
        // }
      })
      .then((res) => {
        alert(
          `Transaksi berhasil! Total harga: Rp${res.data.total_harga.toLocaleString()}`
        );
        navigate("/my-ticket");
      })
      .catch((err) => {
        console.error("Gagal memesan tiket:", err);
        alert("Gagal memesan tiket");
      });
  };

  if (!wisata) {
    return (
      <div className="container mt-5 text-center">
        <h4>Data wisata tidak ditemukan</h4>
      </div>
    );
  }

  return (
    <>
      <UserNavbar user={dummyUser} />
      <div className="container mt-5">
        <h3>Pesan Tiket - {wisata.nama}</h3>
        <p>
          Harga per tiket: Rp
          {Number(wisata.harga_tiket || 0).toLocaleString()}
        </p>

        <div className="mb-3">
          <label>Jumlah Tiket</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={jumlahTiket}
            onChange={(e) => setJumlahTiket(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Tanggal Kunjungan</label>
          <input
            type="date"
            className="form-control"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Konfirmasi Pesanan
        </button>
      </div>
    </>
  );
}
