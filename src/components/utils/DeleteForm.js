import React, { useState } from 'react';
import '../css/DeleteForm.css';
import axios from 'axios';
import Url from '../../Url';

function DeleteForm({ centerList, setCenterList }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleRemoveOption = async () => {
        if (!selectedOption)
            return;

        const updatedOptions = centerList.filter((item) => item.center_id !== selectedOption);
        console.log(updatedOptions);
        try {
            const res = await axios.post(Url.deleteCentre, { center_id: selectedOption });
            if (res.data.success)
                console.log('successful');
            setCenterList(updatedOptions);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="containerx">
            <h1>Remove Centre</h1>
            <div className="form-groupx">
                <label htmlFor="optionx">Centre's List:</label>
                <div className="dropdownx">
                    <select
                        id="option"
                        name="option"
                        value={selectedOption}
                        onChange={handleSelect}
                        className='me-2'
                        required
                    >
                        <option value="">Select a center</option>
                        {
                            centerList &&
                            centerList.map(centre => (
                                <option key={centre.center_id} value={centre.center_id}>
                                    {centre.center_name}
                                </option>
                            ))
                        }

                    </select>
                </div>
                <button className="remove-buttonx mt-3" onClick={handleRemoveOption}>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default DeleteForm;