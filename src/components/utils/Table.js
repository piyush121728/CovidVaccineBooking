import React from 'react';
import axios from 'axios';
import Url from '../../Url';

const Table = ({ covidCentres, setCovidCentres }) => {
    if (!covidCentres)
        return;

    if (covidCentres.msg) {
        return (
            <div className='container mt-5'>
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {covidCentres.msg}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        )
    }


    const bookDose = async (centre, i) => {
        if (!centre.dose_available)
            return;

        try {
            const response = await axios.post(Url.bookCentre, {
                center_id: centre.center_id,
                dose_available: centre.dose_available
            });

            if (response.data.success) {
                let data = [...covidCentres];
                data[i].dose_available -= 1;
                setCovidCentres(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container mt-5'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Centre Name</th>
                        <th scope="col">Centre Address</th>
                        <th scope="col">Age</th>
                        <th scope="col">Dose Available</th>
                        <th scope="col">Vaccine</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        covidCentres.map((centre, i) => (
                            <tr key={i}>
                                <td>{centre.center_name}</td>
                                <td>{centre.center_address}</td>
                                <td>{centre.age}</td>
                                <td>{centre.dose_available}</td>
                                <td>{centre.vaccine}</td>
                                <td>
                                    <button type="button"
                                        style={{
                                            backgroundColor: '#017e7e', color: 'white', height: '70%',
                                            borderRadius: '5px', borderColor: '#017e7e'
                                        }}
                                        onClick={() => bookDose(centre, i)}
                                    >
                                        Book
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;