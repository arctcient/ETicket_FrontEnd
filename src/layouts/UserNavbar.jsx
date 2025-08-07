import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

export default function UserNavbar({ user }) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">E-Ticket</Link>

                <div className="d-flex align-items-center gap-3 me-auto ms-4">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/my-ticket">My Ticket</Link>
                </div>

                <Dropdown align="end">
                    <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
                        <img
                            src={user?.foto || 'https://via.placeholder.com/30'}
                            alt="Profile"
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                        />
                        <span>{user?.nama || 'User'}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    );
}
