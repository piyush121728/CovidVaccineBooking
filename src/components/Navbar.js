import React from 'react';

const Navbar = ({profile}) => {
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