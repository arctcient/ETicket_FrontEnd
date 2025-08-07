import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);

      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors)[0][0];
        setError(firstError);
      } else {
        setError('Terjadi kesalahan saat registrasi.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Register E-Ticket</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nama</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Masukkan nama"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Masukkan email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Masukkan password (min 6 karakter)"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Konfirmasi Password</label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              className="form-control"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              placeholder="Ulangi password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Daftar</button>
        </form>

        <div className="text-center mt-3">
          <span>Sudah punya akun? </span>
          <Link to="/login">Login di sini</Link>
        </div>
      </div>
    </div>
  );
}