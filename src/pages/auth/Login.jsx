import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      const { access_token, user } = response.data;

      // Simpan token dan role ke localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user_id', user.id); // Simpan ID jika perlu digunakan

      // Redirect berdasarkan role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      window.location.reload(); // Supaya useEffect dan guard langsung jalan
    } catch (error) {
      setErrorMessage('Email atau password salah');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login E-Ticket</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Masukkan email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Masukkan password"
            />
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2 text-center">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <span>Belum punya akun? </span>
          <Link to="/register">Daftar di sini</Link>
        </div>
      </div>
    </div>
  );
}
