import React, { useState } from 'react';
import axios from 'axios';
import '../css/CentreForm.css';
import Url from '../../Url';

function Form() {
    const [formData, setFormData] = useState({
        center_name: '',
        center_address: '',
        pincode: '',
        vaccine: '',
        age: '',
        success: false
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(Url.adminCreateCentre, formData);
            if (response.data.success) {
                console.log('Form submitted successfully!');
                setFormData({
                    center_name: '',
                    center_address: '',
                    pincode: '',
                    vaccine: '',
                    age: '',
                    success: true
                });
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    if (formData.success) {
        return (
            <form className="success-message" onSubmit={() => setFormData({ ...formData, success: false})}>
                <h3>Form submitted successfully!</h3>
                <button type="submit">Add More</button>
            </form>
        )
    }

    return (
        <div className="containerX">
            <h1>Register a new centre</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="center_name"
                        name="center_name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="center_address"
                        name="center_address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vaccine">Vaccine:</label>
                    <select
                        id="vaccine"
                        name="vaccine"
                        value={formData.vaccine}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Vaccine --</option>
                        <option value="Coavaxin">Coavaxin</option>
                        <option value="Covishield">Covishield</option>
                        <option value="Covovax">Covovax</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Above Age:</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Form;