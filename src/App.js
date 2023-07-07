import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AdminHome from './components/AdminHome';
// import Cookies from "universal-cookie";

function App() {
    const [user, setUser] = useState(null);
    // const cookies = new Cookies();
    
    // if (user?.access_token)
        // cookies.set('google_access_token')
    console.log("user => ", user)

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login user={user} setUser={setUser} />} />
                <Route path="/" element={<Home user={user} setUser={setUser} />}/>
            </Routes>
        </Router>
    );
}

export default App;