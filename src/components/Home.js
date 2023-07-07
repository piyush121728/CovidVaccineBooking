import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import useProfile from '../hooks/useProfile';
// import useValidate from '../hooks/useValidate';
import Navbar from './Navbar';
import axios from 'axios';
import Url from '../Url';
import Table from './utils/Table';
import AdminHome from './AdminHome';

const Home = ({ user, setUser }) => {

    // const profile = useProfile(user);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    console.log("home===>", user)
    
    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user) {
            console.log(user);
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
                                return;
                            })
                            .catch((err) => {
                                console.log(err);
                                navigate('/login');
                            });
                    }
                    else {
                        console.log('not a admin', userProfile)
                        setProfile(userProfile);
                        return;
                    }

                })
                .catch((err) => {
                    console.log(err)
                    navigate('/login');
                });
        }
    }, []);

    console.log("home", profile)
    // useValidate(profile);

    const [pincode, setPincode] = useState();
    const [err, setError] = useState();
    const [covidCentres, setCovidCentres] = useState();

    const searchCentres = async () => {

        function isValidPincode(pin) {
            let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
            if (pin == null)
                return false;
            return regex.test(pin);
        }

        if (!isValidPincode(pincode)) {
            setError('Pincode is not valid.');
            return;
        }

        const pin = pincode.replace(/\s/g, "");
        try {
            const response = await axios.post(Url.searchByPin, { pincode: pin });
            console.log(response.data)
            setCovidCentres(response.data);
        } catch (err) {
            setError(err.message);
        }
    }

    console.log("home ===> ", profile)
    if (profile && profile?.userType === 'Admin') {
        return (<AdminHome user={user} setUser={setUser} />)
    }

    return (
        <>
            <Navbar profile={profile} setUser={setUser} />
            {
                err &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {err}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                        onClick={() => setError(null)}>
                    </button>
                </div>
            }

            <div
            // style={{
            //     backgroundImage: 'url("./images/userbg.jpeg")',
            //     height: "90vh",
            //     width: "90vw"
            // }}
            >
                <div className='container d-flex justify-content-center align-items-center flex-column mt-5'>

                    <h1 style={{ color: "#017e7e" }}>Search by Pin</h1>
                    <div className='container d-flex justify-content-center align-items-center gap-3'
                        style={{ width: '50%' }}
                    >
                        <input type="text" className="form-control"
                            placeholder="Pincode" aria-label="Username" aria-describedby="basic-addon1"
                            onChange={(e) => setPincode(e.target.value)}
                        />
                        <button type="button" className="btn"
                            style={{ width: '30%', backgroundColor: "#017e7e", color: "white" }}
                            onClick={searchCentres}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <Table covidCentres={covidCentres} setCovidCentres={setCovidCentres} />
        </>
    )
}

export default Home;