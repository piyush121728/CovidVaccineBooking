import React from 'react';
import '../css/AllCentres.css';

function AllCentres({ centerList }) {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Centre Name</th>
                        <th>Centre Address</th>
                        <th>Pincode</th>
                        <th>Vaccine</th>
                        <th>Age</th>
                        <th>Dose Available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        centerList &&
                        centerList.map((row, index) => (
                            <tr key={index}>
                                <td>{row.center_name}</td>
                                <td>{row.center_address}</td>
                                <td>{row.pincode}</td>
                                <td>{row.vaccine}</td>
                                <td>{row.age}</td>
                                <td>{row.dose_available}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AllCentres;