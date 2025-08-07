import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_hp: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi tidak cocok.');
      return;
    }

    console.log('Data register:', formData);

    alert('Registrasi berhasil! Silakan login.');
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Register E-Ticket</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">Nama Lengkap</label>
            <input
              type="text"
              id="nama"
              name="nama"
              className="form-control"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Masukkan email aktif"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="no_hp" className="form-label">No HP</label>
            <input
              type="text"
              id="no_hp"
              name="no_hp"
              className="form-control"
              value={formData.no_hp}
              onChange={handleChange}
              required
              placeholder="Masukkan nomor HP"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Masukkan password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Ulangi password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>

        <div className="text-center mt-3">
          <span>Sudah punya akun? </span>
          <Link to="/login">Login di sini</Link>
        </div>
      </div>
    </div>
  );
}
