import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useProfile from '../hooks/useProfile';
// import axios from 'axios';

function Login({ profile, setProfile }) {
    const [user, setUser] = useState([]);
    const [userType, setUserType] = useState("Select");
    const [err, setError] = useState();

    const navigate = useNavigate();
    if (profile) {
        navigate('/');
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => setError(error)
    });

    useProfile(user, setProfile, userType);
    
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div className='d-flex justify-content-center align-items-center'
            style={{ height: "100vh", width: "100vw", backgroundColor: "#017e7e" }} >
            {
                err &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {err}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                        onClick={() => setError(null)}>
                    </button>
                </div>
            }

            <div className='container'
                style={{ backgroundColor: "#edffff", height: "50%", width: "30%", borderRadius: '5px' }}>

                <img src="./images/mainlogo.jpeg" alt="user" style={{ height: '50%', width: '100%' }} />

                <div className='d-flex justify-content-center'>
                    <div className="dropdown px-5 mt-5">
                        <button className="px-5 btn dropdown-toggle"
                            style={{ backgroundColor: "#017e7e", color: "white" }}
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {userType}
                        </button>
                        <ul className="dropdown-menu">
                            <li className='dropdown-item'
                                onClick={(e) => setUserType(e.target.textContent)}>
                                    <span className="fas fa-user"></span> User
                            </li>
                            <li className='dropdown-item'
                                onClick={(e) => setUserType(e.target.textContent)}>
                                <span className="fas fa-user-shield"></span> Admin                   
                            </li>
                        </ul>
                    </div>
                </div>

                {
                    userType !== "Select" &&
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="button" className="btn px-5"
                            onClick={() => login()}
                            style={{ backgroundColor: "#017e7e", color: "white" }}
                        >
                            Login With Google
                        </button>
                    </div>
                }

            </div>
        </div>
    );
}

export default Login;