import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AdminHome from './components/AdminHome';

function App() {
    const [profile, setProfile] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login profile={profile} setProfile={setProfile} />} />
                <Route path="/" element={
                    profile && profile.userType === 'admin' ? 
                    <AdminHome profile={profile} />
                    :
                    <Home profile={profile} />
                }
                />
            </Routes>
        </Router>
    );
}

export default App;