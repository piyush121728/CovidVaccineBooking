import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

// import useProfile from '../hooks/useProfile';
// import useValidate from '../hooks/useValidate';
import './css/adminHome.css'
import axios from 'axios';
import Url from '../Url';
import CenterForm from './utils/CenterForm';
import DeleteFrom from './utils/DeleteForm';
import AllCentres from './utils/AllCentres';


const AdminHome = ({ user, setUser }) => {

    // const profile = useProfile(user);
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [centerList, setCenterList] = useState();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user) {
            let userProfile;
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    userProfile = res.data;
                    console.log("profile data from google", res.data)
                    // setProfile(userProfile);

                    if (user.userType === 'Admin') {
                        axios.post(Url.verifyAdmin, { email: userProfile.email })
                            .then(res => {
                                console.log("verified as admin", userProfile)
                                userProfile = { ...userProfile, userType: 'Admin' }
                                setProfile(userProfile);
                            })
                            .catch((err) => {
                                console.log(err);
                                navigate('/login');
                            });
                    }
                    else {
                        console.log('not a admin', userProfile)
                        setProfile(userProfile);
                    }

                })
                .catch((err) => {
                    console.log(err);
                    navigate('/login');
                });

            // console.log(userProfile)
            const fetchAllCentres = async () => {
                try {
                    const response = await axios.get(Url.fetchAllCentres);
                    console.log(response.data)
                    setCenterList(response.data);
                } catch (err) {
                    console.log("Couldn't fetch centres list");
                }
            }
            fetchAllCentres();
        }
    }, []);

    // useValidate(profile);

    return (
        <>
            <Navbar profile={profile} setUser={setUser}/>
            <div className="container">
                <div className="section">
                    <div className="text">
                        <CenterForm />
                    </div>
                    <div className="image">
                        <img src="./images/hospital.jpeg" alt="img" />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="section">
                    <div className="image">
                        <img src="./images/vaccine.jpeg" alt="img" />
                    </div>
                    <div className="text">
                        <DeleteFrom centerList={centerList} setCenterList={setCenterList} />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="section">
                    <div className="text">
                        <AllCentres centerList={centerList} />
                    </div>
                    <div className="image">
                        <img src="./images/injection.jpeg" alt="img" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome;