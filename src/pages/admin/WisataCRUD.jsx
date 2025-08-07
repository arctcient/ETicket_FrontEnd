// Isi sama persis seperti versi "AdminDashboard.jsx" yang sebelumnya,
// cukup ubah nama function dan sesuaikan

import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import AdminNavbar from '../../layouts/AdminNavbar';

export default function WisataCRUD() {
  const [wisataList, setWisataList] = useState([
    {
      id: 1,
      nama: 'Pantai Kuta',
      lokasi: 'Bali',
      harga: 50000,
      deskripsi: 'Pantai indah dengan pasir putih dan ombak.',
      gambar: 'https://source.unsplash.com/400x300/?beach',
    },
    {
      id: 2,
      nama: 'Gunung Bromo',
      lokasi: 'Jawa Timur',
      harga: 100000,
      deskripsi: 'Gunung dengan sunrise indah.',
      gambar: 'https://source.unsplash.com/400x300/?mountain',
    },
  ]);
  const admin = {
    nama: 'Admin Satu',
    foto: '',
  };

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newData = {
      id: editData ? editData.id : Date.now(),
      nama: form.nama.value,
      lokasi: form.lokasi.value,
      harga: parseInt(form.harga.value),
      deskripsi: form.deskripsi.value,
      gambar: form.gambar.value,
    };

    if (editData) {
      setWisataList(wisataList.map(w => w.id === editData.id ? newData : w));
    } else {
      setWisataList([...wisataList, newData]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin hapus data?')) {
      setWisataList(wisataList.filter(w => w.id !== id));
    }
  };

  return (
    <div>
      <AdminNavbar admin={admin} />

      <div className="container my-5">
        <h3 className="mb-4">Kelola Tempat Wisata</h3>

        <Button variant="success" onClick={handleShow}>Tambah Wisata</Button>

        <div className="row mt-4">
          {wisataList.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.gambar}
                  className="card-img-top"
                  alt={item.nama}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.nama}</h5>
                  <p>{item.lokasi} - Rp{item.harga.toLocaleString()}</p>
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
          ))}
        </div>

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{editData ? 'Edit Wisata' : 'Tambah Wisata'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nama Wisata</Form.Label>
                <Form.Control name="nama" defaultValue={editData?.nama} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lokasi</Form.Label>
                <Form.Control name="lokasi" defaultValue={editData?.lokasi} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="number"
                  name="harga"
                  defaultValue={editData?.harga}
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
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Link Gambar</Form.Label>
                <Form.Control name="gambar" defaultValue={editData?.gambar} />
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
