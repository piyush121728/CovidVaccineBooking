import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ profile, setUser }) => {
    const navigate = useNavigate();

    const logout = () => {
        googleLogout();
        setUser(null);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#017e7e'}}>
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <a className="navbar-brand mt-2 mt-lg-0" href="/">
                        <img
                            src="./images/new_logo.jpeg"
                            height="30"
                            alt="Logo"
                            loading="lazy"
                            width="100"
                        />
                    </a>
                </div>

                <div className="d-flex align-items-center">
                    <button type="button" className="btn px-5"
                        onClick={() => logout()}
                        style={{ backgroundColor: "#edffff" }}
                    >
                        Logout
                    </button>
                    <img
                        src={profile && profile.image}
                        className="rounded-circle"
                        height="25"
                        alt="user pic"
                        loading="lazy"
                    />
                </div>
            </div>
        </nav>
    )
};

export default Navbar;