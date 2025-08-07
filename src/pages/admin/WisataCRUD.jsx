// Isi sama persis seperti versi "AdminDashboard.jsx" yang sebelumnya,
// cukup ubah nama function dan sesuaikan

import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import AdminNavbar from '../../layouts/AdminNavbar';
import { getWisata, addWisata, updateWisata, deleteWisata } from '../../api/wisataApi';

export default function WisataCRUD() {
  const [wisataList, setWisataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const admin = { nama: 'Admin Satu', foto: '' };

  // Ambil data pertama kali
  useEffect(() => {
    fetchWisata();
  }, []);

  const fetchWisata = async () => {
    try {
      setLoading(true);
      const res = await getWisata();
      setWisataList(res.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      alert("Gagal memuat data wisata");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newData = {
      nama: form.nama.value,
      lokasi: form.lokasi.value,
      harga_tiket: parseInt(form.harga.value),
      deskripsi: form.deskripsi.value,
      gambar: form.gambar.value,
    };

    try {
      if (editData) {
        await updateWisata(editData.id, newData);
        alert("Data berhasil diperbarui");
      } else {
        await addWisata(newData);
        alert("Data berhasil ditambahkan");
      }
      fetchWisata();
      handleClose();
    } catch (error) {
      console.error("Error simpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin hapus data ini?')) {
      try {
        await deleteWisata(id);
        alert("Data berhasil dihapus");
        fetchWisata();
      } catch (error) {
        console.error("Error hapus data:", error);
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  return (
    <div>
      <AdminNavbar admin={admin} />

      <div className="container my-5">
        <h3 className="mb-4">Kelola Tempat Wisata</h3>
        <Button variant="success" onClick={handleShow}>
          Tambah Wisata
        </Button>

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="primary" />
            <p>Memuat data...</p>
          </div>
        ) : (
          <div className="row mt-4">
            {wisataList.length === 0 ? (
              <p className="text-center">Belum ada data wisata.</p>
            ) : (
              wisataList.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card h-100 shadow-sm">
                    {item.gambar && (
                      <img
                        src={item.gambar}
                        className="card-img-top"
                        alt={item.nama}
                        style={{ objectFit: 'cover', height: '200px' }}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{item.nama}</h5>
                      <p>
                        {item.lokasi} -{" "}
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 2,
                        }).format(item.harga_tiket)}
                      </p>
                      <p>{item.deskripsi}</p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setEditData(item);
                          setShowModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal Form */}
        <Modal show={showModal} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editData ? 'Edit Wisata' : 'Tambah Wisata'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nama Wisata</Form.Label>
                <Form.Control
                  name="nama"
                  defaultValue={editData?.nama}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lokasi</Form.Label>
                <Form.Control
                  name="lokasi"
                  defaultValue={editData?.lokasi}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Harga Tiket</Form.Label>
                <Form.Control
                  type="number"
                  name="harga"
                  defaultValue={editData?.harga_tiket}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  name="deskripsi"
                  defaultValue={editData?.deskripsi}
                  rows={3}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Link Gambar</Form.Label>
                <Form.Control
                  type="url"
                  name="gambar"
                  defaultValue={editData?.gambar}
                  placeholder="https://source.unsplash.com/400x300/?beach"
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Batal
              </Button>
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </div>
  );
}