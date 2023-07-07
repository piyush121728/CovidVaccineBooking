import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import useValidate from '../hooks/useValidate';
import './css/adminHome.css'
import axios from 'axios';
import Url from '../Url';
import CenterForm from './utils/CenterForm';
import DeleteFrom from './utils/DeleteForm';
import AllCentres from './utils/AllCentres';

const AdminHome = ({ profile }) => {

    useValidate(profile);
    const [centerList, setCenterList] = useState();

    useEffect(() => {
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
    }, [])

    return (
        <>
            <Navbar profile={profile} />
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