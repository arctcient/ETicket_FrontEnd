import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

export default function AdminNavbar({ admin }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
            <div className="container-fluid">
                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/admin">E-Ticket Admin</Link>

                {/* Menu kiri */}
                <div className="d-flex align-items-center gap-3 me-auto ms-4">
                    <Link className="nav-link" to="/admin">Dashboard</Link>
                    <Link className="nav-link" to="/admin/wisata">Kelola Wisata</Link>
                    <Link className="nav-link" to="/admin/history">Kelola Tiket</Link>
                </div>

                {/* Kanan atas */}
                <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="dropdown-admin" className="d-flex align-items-center">
                        <img
                            src={admin?.foto || 'https://via.placeholder.com/30'}
                            alt="Profile"
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                        />
                        <span>{admin?.nama || 'Admin'}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    );
}
