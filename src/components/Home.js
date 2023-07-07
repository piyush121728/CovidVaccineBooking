import React, { useState } from 'react';
import useValidate from '../hooks/useValidate';
import Navbar from './Navbar';
import axios from 'axios';
import Url from '../Url';
import Table from './utils/Table';

const Home = ({ profile }) => {
    useValidate(profile);
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

    return (
        <>
            <Navbar profile={profile} />
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